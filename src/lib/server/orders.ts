// Saves a paid Stripe checkout as an order in our database.
// Called from two places, so an order is saved even if one of them never runs:
//   - the payment-success page (the visitor's browser comes back from Stripe), and
//   - the Stripe webhook (Stripe's own server calls ours when the payment is done).
// Both may run for the same payment; the unique Stripe session id stops a double save.
import { Prisma } from '@prisma/client';
import type Stripe from 'stripe';
import { prisma } from './db';
import { getStripe } from './stripe';

// Keep the table small: everyone shares the demo customer, so old orders are dropped.
// Sample orders from the seed (ids starting "seed_") are kept forever.
const KEEP_DAYS = 30;

export async function saveOrder(sessionId: string) {
	if (!/^cs_(test|live)_\w+$/.test(sessionId)) return null;

	const existing = await prisma.order.findUnique({ where: { stripeSessionId: sessionId } });
	if (existing) return existing;

	let session: Stripe.Checkout.Session;
	try {
		session = await getStripe().checkout.sessions.retrieve(sessionId, {
			expand: ['line_items.data.price']
		});
	} catch {
		return null; // unknown or made-up session id
	}
	if (session.payment_status !== 'paid') return null;

	// Match Stripe's prices back to our products, to keep the product id with each line.
	const lines = session.line_items?.data ?? [];
	const priceIds = lines.map((l) => l.price?.id).filter((id): id is string => !!id);
	const products = await prisma.product.findMany({
		where: { stripePriceId: { in: priceIds } },
		select: { id: true, name: true, stripePriceId: true }
	});
	const byPrice = new Map(products.map((p) => [p.stripePriceId, p]));

	const account = session.metadata?.account === 'customer' ? 'customer' : null;
	try {
		const order = await prisma.order.create({
			data: {
				stripeSessionId: session.id,
				account,
				total: (session.amount_total ?? 0) / 100,
				items: {
					create: lines.map((l) => {
						const product = l.price?.id ? byPrice.get(l.price.id) : undefined;
						const quantity = l.quantity ?? 1;
						return {
							productId: product?.id ?? null,
							name: product?.name ?? l.description ?? 'Item',
							price: (l.amount_total ?? 0) / 100 / quantity,
							quantity
						};
					})
				}
			}
		});
		await prisma.order.deleteMany({
			where: {
				createdAt: { lt: new Date(Date.now() - KEEP_DAYS * 24 * 60 * 60 * 1000) },
				NOT: { stripeSessionId: { startsWith: 'seed_' } }
			}
		});
		return order;
	} catch (e) {
		// The other caller saved it a moment ago (unique id clash): that's fine.
		if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
			return prisma.order.findUnique({ where: { stripeSessionId: sessionId } });
		}
		throw e;
	}
}
