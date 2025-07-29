import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const GET = async ({ params }) => {
    try {
        // Fetching products from the database
        const { id } = params
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                category: true, // This will include the full category object
            }
        })

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch the product" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
