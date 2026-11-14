import { getJson } from '$lib/api';
import type { ProductWithCategory } from '../app';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const products = await getJson<ProductWithCategory[]>(fetch, '/api/products');
	return { products };
};
