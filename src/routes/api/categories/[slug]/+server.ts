import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	// Slugs are stored with a leading slash, e.g. "/seating".
	const category = await prisma.category.findUnique({
		where: { slug: '/' + params.slug },
		include: { products: { orderBy: { id: 'asc' } } }
	});
	if (!category) error(404, 'Category not found');
	return json(category);
};
