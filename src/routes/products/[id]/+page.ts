import { getJson } from '$lib/api';
import type { CategoryWithProducts, ProductWithCategory } from '../../../app';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const product = await getJson<ProductWithCategory>(fetch, `/api/products/${params.id}`);

	// "You might also like": other products from the same category, never the one on screen.
	const catRes = await fetch(`/api/categories${product.category.slug}`);
	const category: CategoryWithProducts | null = catRes.ok ? await catRes.json() : null;
	const relatedProducts = (category?.products ?? []).filter((p) => p.id !== product.id).slice(0, 4);

	return { product, relatedProducts };
};
