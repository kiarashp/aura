import { getJson } from '$lib/api';
import type { CategoryWithProducts } from '../../../app';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const category = await getJson<CategoryWithProducts>(fetch, `/api/categories/${params.slug}`);
	return { category };
};
