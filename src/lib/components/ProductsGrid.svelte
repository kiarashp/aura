<script lang="ts">
	import type { Product } from '@prisma/client';
	import ProductCard from './ProductCard.svelte';

	interface Props {
		products: Product[];
		customClass?: string;
		cellCustomClass?: string;
		customImageClass?: string;
	}
	let { products, customClass = 'grid-cols-3 gap-6', cellCustomClass, customImageClass }: Props =
		$props();
</script>

<div class="grid {customClass}">
	{#each products as product (product.id)}
		<ProductCard {product} extraClass={cellCustomClass} imageClass={customImageClass} />
	{/each}
</div>
