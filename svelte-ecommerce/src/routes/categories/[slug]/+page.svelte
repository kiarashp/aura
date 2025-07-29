<script>
	import ProductCard from '$lib/components/ProductCard.svelte';
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	const { data } = $props();
	const products = derived(page, ($page) => $page.data.category.products || []);

	console.log('products: ', products);
</script>

<!-- products -->
<div class="grid w-full grid-cols-3 gap-4 px-[80px] py-[36px]">
	{#each $products as product, index (product.id)}
		<ProductCard {product} class="col-span-1" />
	{/each}
	<div class="col-span-3 flex w-full items-center justify-center">
		<SimpleButton btnText="Load more" btnWidth="w-[176px]" />
	</div>
</div>
