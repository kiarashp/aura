import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const GET = async () => {
    try {
        const categories = await prisma.category.findMany()
        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Error fetching categories:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

