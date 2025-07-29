import type { PageLoad } from './$types.js';
import type { Product,Category } from '@prisma/client';

export const load:PageLoad= async ({ fetch })=> {
    const productsRes = await fetch('/api/products');
    const products: Product[] = productsRes.ok ? await productsRes.json() : [];

    const categoriesRes = await fetch('/api/categories');
    const categories2:Category[] = categoriesRes.ok ? await categoriesRes.json() : [];

    return { categories2, products };

}
