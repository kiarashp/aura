<script lang="ts">
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import ProductsGrid from '$lib/components/ProductsGrid.svelte';

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

<div
	class="defaultPadding relative flex h-[209px] w-full items-end bg-cover bg-bottom pb-[36px]"
	style="background-image: url('/general/decorative-11.jpg');"
>
	<span class="bg-primary-950 absolute inset-0 z-0 opacity-30"></span>
	<h1 class="text-surface-100 bigHeader z-10">{data.category.name}</h1>
</div>

<div class="bg-surface-50 dark:bg-primary-900 defaultPadding flex grow flex-col py-[80px]">
	{#if products.length === 0}
		<p class="subheader text-center">There are no products in this category yet.</p>
	{:else}
		<ProductsGrid customClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" {products} />
	{/if}
	{#if !showAll && data.category.products.length > FIRST_PAGE}
		<div class="mt-[35px] flex items-center justify-center">
			<SimpleButton btnText="Load more" onclick={() => (showAllFor = data.category.slug)} />
		</div>
	{/if}
</div>
