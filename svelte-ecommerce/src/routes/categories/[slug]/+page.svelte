<script>
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import ProductsGrid from '$lib/components/ProductsGrid.svelte';

	const { data } = $props();
	
	let products = $derived(data.category.products?.slice(0, 3) || []);
	let isMore = $derived(data.category.products?.length>3)

	function handleLoadMore() {
		products =  [...products,...data.category.products?.slice(3) || []]
		isMore = false
	}
</script>

<!-- Products -->
<div class="bg-surface-50 dark:bg-primary-900 flex flex-col defaultPadding py-[80px]">
	<ProductsGrid customClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 " {products} />
	<div class="mt-[35px] flex items-center justify-center">
		{#if isMore}
		<SimpleButton btnText="Load more" onclick={handleLoadMore} />
		{/if}
	</div>
</div>
