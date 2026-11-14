// The two public demo logins: "customer" and "admin". There are no passwords and no sign-up:
// a visitor clicks a button on /sign-in and gets a cookie that says which one they are.
//
// The cookie is not signed, so a visitor could write it by hand. That is fine on purpose:
// both logins are open to everyone anyway, and both are read-only (the admin pages only show
// things, and the customer can only do what a guest can, plus see the demo orders).
import type { Cookies } from '@sveltejs/kit';

export type Account = 'customer' | 'admin';

const COOKIE = 'aura_demo';
const WEEK = 60 * 60 * 24 * 7;

export function readAccount(cookies: Cookies): Account | null {
	const value = cookies.get(COOKIE);
	return value === 'customer' || value === 'admin' ? value : null;
}

export function signIn(cookies: Cookies, account: Account) {
	cookies.set(COOKIE, account, { path: '/', httpOnly: true, sameSite: 'lax', maxAge: WEEK });
}

export function signOut(cookies: Cookies) {
	cookies.delete(COOKIE, { path: '/' });
}
