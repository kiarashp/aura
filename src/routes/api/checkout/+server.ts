import Stripe from 'stripe';
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { prisma } from '$lib/server/db';
import type { RequestHandler } from './$types';

// Read at run time (dynamic), so the same build works on any server with its own keys.
let stripe: Stripe | undefined;
function getStripe() {
	if (!env.STRIPEAPIKEY) error(500, 'Payments are not set up');
	stripe ??= new Stripe(env.STRIPEAPIKEY, {
		apiVersion: (env.API_VERSION || '2025-06-30.basil') as Stripe.LatestApiVersion
	});
	return stripe;
}

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

export const POST: RequestHandler = async ({ request, url }) => {
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
		success_url: `${url.origin}/payment-success`,
		cancel_url: `${url.origin}/payment-canceled`
	});
	if (!session.url) error(502, 'Could not start the payment');
	return json({ url: session.url });
};
