// A tiny "are you alive?" address for Docker's health check (see compose.server.yml).
// It also asks the database one trivial question, so "healthy" means the shop can really show products.
import { text } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export async function GET() {
	try {
		await prisma.$queryRaw`SELECT 1`;
		return text('ok');
	} catch {
		return text('database not reachable', { status: 503 });
	}
}
