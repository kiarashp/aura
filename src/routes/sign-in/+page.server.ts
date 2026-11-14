import { redirect } from '@sveltejs/kit';
import { signIn } from '$lib/server/demo';
import type { Actions } from './$types';

// One click, no password: each button on the page posts to one of these.
export const actions: Actions = {
	customer: ({ cookies }) => {
		signIn(cookies, 'customer');
		redirect(303, '/account');
	},
	admin: ({ cookies }) => {
		signIn(cookies, 'admin');
		redirect(303, '/admin');
	}
};
