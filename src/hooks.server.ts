import type { Handle } from '@sveltejs/kit';
import { readAccount } from '$lib/server/demo';

// On every request: which demo login (if any) is this visitor using?
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.account = readAccount(event.cookies);
	return resolve(event);
};
