import { getJson } from '$lib/api';
import type { Category } from '@prisma/client';
import type { ProductWithCategory } from '../../app';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const [categories, products] = await Promise.all([
		getJson<Category[]>(fetch, '/api/categories'),
		getJson<ProductWithCategory[]>(fetch, '/api/products')
	]);
	return { categories, products };
};
