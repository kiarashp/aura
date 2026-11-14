import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// There is no separate products list page; all products live on /categories.
export const load: PageLoad = () => {
	redirect(308, '/categories');
};
