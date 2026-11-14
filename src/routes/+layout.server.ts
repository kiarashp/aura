import type { LayoutServerLoad } from './$types';

// Tell every page which demo login the visitor is using (for the header's account link).
export const load: LayoutServerLoad = ({ locals }) => ({ account: locals.account });
