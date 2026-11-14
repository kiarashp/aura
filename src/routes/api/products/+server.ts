import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const products = await prisma.product.findMany({
		include: { category: true },
		orderBy: { id: 'asc' }
	});
	return json(products);
};
