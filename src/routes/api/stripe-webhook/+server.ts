import { error, text } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getStripe } from '$lib/server/stripe';
import { saveOrder } from '$lib/server/orders';
import type { RequestHandler } from './$types';

// Stripe's server calls this address when a checkout is paid (a "webhook"), so the order is saved
// even if the visitor closes the tab before coming back to our success page.
// Set up in the Stripe dashboard: event "checkout.session.completed", and put the signing secret
// it shows into STRIPE_WEBHOOK_SECRET. Without that secret this address is switched off.
export const POST: RequestHandler = async ({ request }) => {
	if (!env.STRIPE_WEBHOOK_SECRET) error(404, 'Not found');

	// The signature proves the call really comes from Stripe, not from someone else.
	let event;
	try {
		event = getStripe().webhooks.constructEvent(
			await request.text(),
			request.headers.get('stripe-signature') ?? '',
			env.STRIPE_WEBHOOK_SECRET
		);
	} catch {
		error(400, 'Bad signature');
	}

	if (event.type === 'checkout.session.completed') {
		await saveOrder(event.data.object.id);
	}
	return text('ok');
};
