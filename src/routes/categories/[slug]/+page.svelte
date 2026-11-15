<script lang="ts">
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import ProductsGrid from '$lib/components/ProductsGrid.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import { categoryBanner, categoryLine } from '$lib/images';

	const { data } = $props();
	const FIRST_PAGE = 6;

	// Remember "show all" per category, so switching category starts again at the first page.
	let showAllFor = $state('');
	let showAll = $derived(showAllFor === data.category.slug);
	let products = $derived(
		showAll ? data.category.products : data.category.products.slice(0, FIRST_PAGE)
	);
</script>

<svelte:head>
	<title>{data.category.name} | Aura</title>
	<meta name="description" content="Browse {data.category.name.toLowerCase()} at Aura." />
</svelte:head>

<PageBanner
	image={categoryBanner(data.category.slug)}
	title={data.category.name}
	subtitle={categoryLine(data.category.slug)}
/>

<div class="bg-surface-50 dark:bg-primary-950 defaultPadding flex grow flex-col py-14 md:py-20">
	<h2 class="sr-only">Products</h2>
	{#if products.length === 0}
		<p class="subheader text-center">There are no products in this category yet.</p>
	{:else}
		<ProductsGrid customClass="mx-auto w-full max-w-[1800px] grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10" {products} />
	{/if}
	{#if !showAll && data.category.products.length > FIRST_PAGE}
		<div class="mt-[35px] flex items-center justify-center">
			<SimpleButton btnText="Load more" onclick={() => (showAllFor = data.category.slug)} />
		</div>
	{/if}
</div>
