	import type { LayoutLoad } from './$types.js';
    export const load:LayoutLoad =  async  ({ fetch })=> {

    const categoriesRes = await fetch('/api/categories');
    const allCategories = categoriesRes.ok ? await categoriesRes.json() : [];

    return { allCategories };

}