import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { getStripe } from '$lib/server/stripe';
import type { RequestHandler } from './$types';

type CartLine = { id: number; quantity: number };

function readCart(body: unknown): CartLine[] {
	const items = (body as { items?: unknown })?.items;
	if (!Array.isArray(items) || items.length === 0 || items.length > 50) return [];
	const lines: CartLine[] = [];
	for (const item of items) {
		const id = Number(item?.id);
		const quantity = Number(item?.quantity);
		if (!Number.isInteger(id) || id < 1) return [];
		if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return [];
		lines.push({ id, quantity });
	}
	return lines;
}

export const POST: RequestHandler = async ({ request, url, locals }) => {
	const lines = readCart(await request.json().catch(() => null));
	if (lines.length === 0) error(400, 'Your cart is empty');

	// Prices come from our own database, never from the browser.
	const products = await prisma.product.findMany({
		where: { id: { in: lines.map((l) => l.id) } },
		select: { id: true, stripePriceId: true }
	});
	const priceById = new Map(products.map((p) => [p.id, p.stripePriceId]));
	const lineItems = lines
		.filter((l) => priceById.has(l.id))
		.map((l) => ({ price: priceById.get(l.id)!, quantity: l.quantity }));
	if (lineItems.length === 0) error(400, 'None of the items in your cart are for sale anymore');

	const session = await getStripe().checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		// Marks orders by the demo customer, so they show on its "My orders" page.
		metadata: locals.account === 'customer' ? { account: 'customer' } : {},
		// Stripe fills in {CHECKOUT_SESSION_ID}; the success page uses it to save the order.
		success_url: `${url.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${url.origin}/payment-canceled`
	});
	if (!session.url) error(502, 'Could not start the payment');
	return json({ url: session.url });
};
