
export async function load({ fetch, params }) {
    const id = params.id;

    // console.log(id)
    const productRes = await fetch(`/api/products/${id}`);
    const product = productRes.ok ? await productRes.json() : [];

    const categoriesRes = await fetch(`/api/categories${product.category.slug}`);
    const relatedProducts = categoriesRes.ok ? await categoriesRes.json() : [];


    return { product,relatedProducts }

}