import { saveOrder } from '$lib/server/orders';
import type { PageServerLoad } from './$types';

// Stripe sends the visitor back here with ?session_id=...; save the order now
// (the webhook may have done it already, which is fine).
export const load: PageServerLoad = async ({ url, locals }) => {
	const sessionId = url.searchParams.get('session_id');
	const order = sessionId ? await saveOrder(sessionId).catch(() => null) : null;
	return { savedToAccount: !!order && order.account === 'customer' && locals.account === 'customer' };
};
