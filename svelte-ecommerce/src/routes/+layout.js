	export async function load({ fetch }) {

    const categoriesRes = await fetch('/api/categories');
    const allCategories = categoriesRes.ok ? await categoriesRes.json() : [];

    return { allCategories };

}