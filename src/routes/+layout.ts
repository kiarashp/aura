import type { Category } from '@prisma/client';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	// The menu should still show if the category list fails, so no error page here.
	const res = await fetch('/api/categories');
	const allCategories: Category[] = res.ok ? await res.json() : [];
	return { allCategories };
};
