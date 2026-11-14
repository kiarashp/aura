import type { Product } from '@prisma/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	// Fresh products, so the cart never shows an old name or price.
	// If this fails the cart still works with what the browser saved.
	const res = await fetch('/api/products');
	const products: Product[] = res.ok ? await res.json() : [];
	return { products };
};
