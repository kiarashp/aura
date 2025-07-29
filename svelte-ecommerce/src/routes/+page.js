export async function load({ fetch }) {
    const productsRes = await fetch('/api/products');
    const products = productsRes.ok ? await productsRes.json() : [];

    const categoriesRes = await fetch('/api/categories');
    const categories2 = categoriesRes.ok ? await categoriesRes.json() : [];

    return { categories2, products };

}
