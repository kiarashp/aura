<script lang="ts">
	import type { Product } from '@prisma/client';
	import { formatPrice } from '$lib/format';
	import { imageSet, smallImage } from '$lib/images';

	interface Props {
		product: Product;
		imageClass?: string; // e.g. a different shape than square
		extraClass?: string;
		sizes?: string; // how wide the card is, so the browser picks the right picture size
	}
	let {
		product,
		extraClass = '',
		imageClass = 'aspect-square',
		sizes = '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 90vw'
	}: Props = $props();
</script>

<a href="/products/{product.id}" class="group/card flex flex-col {extraClass}">
	<div
		class="bg-tertiary-200 dark:bg-primary-800 relative overflow-hidden rounded-2xl {imageClass} transition-shadow duration-500 group-hover/card:shadow-[0_20px_40px_-20px_rgb(42_37_75/0.45)]"
	>
		<img
			src={smallImage(product.imageUrl)}
			srcset={imageSet(product.imageUrl)}
			{sizes}
			alt={product.name}
			loading="lazy"
			style:view-transition-name="product-{product.id}"
			class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
		/>
		{#if product.featured}
			<span
				class="bg-surface-50/85 text-primary-900 dark:bg-primary-950/80 dark:text-mint-300 absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur"
				>Featured</span
			>
		{/if}
	</div>
	<div class="mt-3 flex flex-col gap-0.5 px-1">
		<h3
			class="text-primary-950 dark:text-surface-100 group-hover/card:text-primary-500 dark:group-hover/card:text-mint-300 font-medium transition-colors"
		>
			{product.name}
		</h3>
		<p class="text-surface-900 dark:text-tertiary-400 text-sm">
			{formatPrice(product.price)}
		</p>
	</div>
</a>
