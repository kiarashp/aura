import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	// Only plain whole numbers are product ids; anything else ("abc", "1.5", "-3") cannot exist.
	if (!/^\d{1,9}$/.test(params.id)) error(404, 'Product not found');

	const product = await prisma.product.findUnique({
		where: { id: Number(params.id) },
		include: { category: true }
	});
	if (!product) error(404, 'Product not found');
	return json(product);
};
