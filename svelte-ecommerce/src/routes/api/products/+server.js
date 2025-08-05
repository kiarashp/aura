import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const GET = async () => {
    try {
        // Fetching products from the database
        const products = await prisma.product.findMany({
			include: {
				category: true // This will include the full category object
			}});

        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
