import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const GET = async ({ params }) => {
    try {
        const { slug } = params;
        const category = await prisma.category.findUnique({
            where: {
                slug: '/' + slug
            },
            include: {
                products: true
            },
        });

        if (!category) {
            return new Response(JSON.stringify({ error: "Category not found" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(JSON.stringify(category), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });



    } catch (error) {
        console.error("Error fetching category:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch category" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });

    }
}