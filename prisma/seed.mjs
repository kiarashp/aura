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

// Rows were created with fixed ids (so product links stay the same everywhere);
// move the id counters past them so new rows don't clash.
await prisma.$executeRawUnsafe(
	`SELECT setval(pg_get_serial_sequence('"Category"', 'id'), (SELECT MAX(id) FROM "Category"))`
);
await prisma.$executeRawUnsafe(
	`SELECT setval(pg_get_serial_sequence('"Product"', 'id'), (SELECT MAX(id) FROM "Product"))`
);

console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
await prisma.$disconnect();
