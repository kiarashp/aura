import type { PageLoad } from '../$types.js';
import type { Category } from '@prisma/client';
import type { ProductWithCategory } from '../../app.js';

export const load : PageLoad =  async function ({ fetch }) {
    const catResponse = await fetch('/api/categories');
    const categories : Category[] = catResponse.ok ? await catResponse.json() : [];

    const prodResponse = await fetch('/api/products');
    const products :ProductWithCategory[] = prodResponse.ok ? await prodResponse.json() : [];

    return { categories, products };
}