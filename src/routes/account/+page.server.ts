import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.account === 'admin') redirect(303, '/admin');
	if (locals.account !== 'customer') redirect(303, '/sign-in');

	const orders = await prisma.order.findMany({
		where: { account: 'customer' },
		orderBy: { createdAt: 'desc' },
		take: 20,
		include: { items: { orderBy: { id: 'asc' } } }
	});
	return { orders };
};
