import type { PageLoad } from './$types.js';
import type { CategoryWithProducts } from '../../../app.js';
export const load: PageLoad = async ({ fetch, params }) => {
	const categoryRes = await fetch(`/api/categories/${params.slug}/`);

	const category: CategoryWithProducts = categoryRes.ok ? await categoryRes.json() : {};

	return {
		category
	};
};
