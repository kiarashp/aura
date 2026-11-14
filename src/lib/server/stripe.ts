import Stripe from 'stripe';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Read at run time (dynamic), so the same build works on any server with its own keys.
let stripe: Stripe | undefined;
export function getStripe() {
	if (!env.STRIPEAPIKEY) error(500, 'Payments are not set up');
	stripe ??= new Stripe(env.STRIPEAPIKEY, {
		apiVersion: (env.API_VERSION || '2025-06-30.basil') as Stripe.LatestApiVersion
	});
	return stripe;
}
