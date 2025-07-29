export async function load({ fetch }) {
    const catResponse = await fetch('/api/categories');
    const categories = catResponse.ok ? await catResponse.json() : [];

    const prodResponse = await fetch('/api/products');
    const products = prodResponse.ok ? await prodResponse.json() : [];

    return { categories, products };
}