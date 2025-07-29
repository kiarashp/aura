import type { PageLoad } from './$types';
import { Prisma } from '@prisma/client';

type ProductWithCategory = Prisma.ProductGetPayload<{
	include: { category: true };
}>;

export const load: PageLoad = async ({ fetch, params }) => {
	const id = params.id;

	// console.log(id)
	const productRes = await fetch(`/api/products/${id}`);
	const product : ProductWithCategory  = productRes.ok ? await productRes.json() : {};

	const categoriesRes = await fetch(`/api/categories${product.category.slug}`);
	const relatedProducts = categoriesRes.ok ? await categoriesRes.json() : [];

	return { product, relatedProducts };
};
