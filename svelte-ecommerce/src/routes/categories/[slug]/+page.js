export async function load({ fetch, params }) {
    const categoryRes = await fetch(`/api/categories/${params.slug}/`);

    const category = categoryRes.ok ? await categoryRes.json() : [];

    return {category}
}

