import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

// The demo admin page only shows things; there is nothing here that saves.
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.account !== 'admin') redirect(303, '/sign-in');

	const [products, orders, orderCount, revenue] = await Promise.all([
		prisma.product.findMany({
			orderBy: { id: 'asc' },
			select: { id: true, name: true, price: true, featured: true, imageUrl: true, category: { select: { name: true } } }
		}),
		prisma.order.findMany({
			orderBy: { createdAt: 'desc' },
			take: 20,
			include: { items: { select: { quantity: true } } }
		}),
		prisma.order.count(),
		prisma.order.aggregate({ _sum: { total: true } })
	]);
	return { products, orders, orderCount, revenue: revenue._sum.total ?? 0 };
};
