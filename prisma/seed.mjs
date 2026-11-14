// Fills the database with the shop's categories and products (prisma/seed-data.json).
// Safe to run more than once: existing rows are updated, nothing is duplicated.
// Run with: pnpm prisma db seed
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';

const prisma = new PrismaClient();
const { categories, products } = JSON.parse(
	readFileSync(new URL('./seed-data.json', import.meta.url), 'utf8')
);

for (const { id, ...data } of categories) {
	await prisma.category.upsert({ where: { slug: data.slug }, update: data, create: { id, ...data } });
}
for (const { id, ...data } of products) {
	await prisma.product.upsert({ where: { stripeId: data.stripeId }, update: data, create: { id, ...data } });
}

// Three sample orders for the demo customer, so "My orders" is never empty.
// Their ids start with "seed_", so the clean-up of old orders keeps them.
const sampleOrders = [
	{ id: 'seed_order_1', daysAgo: 40, items: [[1, 1], [5, 2]] },
	{ id: 'seed_order_2', daysAgo: 21, items: [[9, 1]] },
	{ id: 'seed_order_3', daysAgo: 6, items: [[3, 1], [12, 1], [13, 2]] }
];
const productById = new Map(products.map((p) => [p.id, p]));
for (const { id, daysAgo, items } of sampleOrders) {
	if (await prisma.order.findUnique({ where: { stripeSessionId: id } })) continue;
	const lines = items.map(([productId, quantity]) => {
		const p = productById.get(productId);
		return { productId, name: p.name, price: p.price, quantity };
	});
	await prisma.order.create({
		data: {
			stripeSessionId: id,
			account: 'customer',
			total: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
			createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
			items: { create: lines }
		}
	});
}

// Rows were created with fixed ids (so product links stay the same everywhere);
// move the id counters past them so new rows don't clash.
await prisma.$executeRawUnsafe(
	`SELECT setval(pg_get_serial_sequence('"Category"', 'id'), (SELECT MAX(id) FROM "Category"))`
);
await prisma.$executeRawUnsafe(
	`SELECT setval(pg_get_serial_sequence('"Product"', 'id'), (SELECT MAX(id) FROM "Product"))`
);

console.log(`Seeded ${categories.length} categories, ${products.length} products and ${sampleOrders.length} sample orders.`);
await prisma.$disconnect();
