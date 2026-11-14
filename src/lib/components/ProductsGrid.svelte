<script lang="ts">
	import type { Product } from '@prisma/client';
	import ProductCard from './ProductCard.svelte';

	interface props {
		products: Product[];
		customClass?: string;
		cellCustomClass?: string;
		customImageClass?: string;
	}
	let {
		products,
		customClass = 'grid-cols-3 gap-6',
		cellCustomClass,
		customImageClass,
	}: props = $props();



</script>

<!-- products -->
<div class="grid {customClass}">
	{#each products as product, index (product.id)}
		<ProductCard  {product} extraClass={cellCustomClass} imageClass={customImageClass} />
		
	{/each}
</div>
