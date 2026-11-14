import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });
	return json(categories);
};
