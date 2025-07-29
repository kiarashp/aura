<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Product } from '@prisma/client';
	interface props extends HTMLAnchorAttributes {
		product: Product;
	}
	let { product ,...restProps}:props = $props();
	let productUrl = '/products/' + product.id;
</script>

<a href={productUrl} class=" group/proCard flex flex-col hover:cursor-pointer" {...restProps}>
	<div class="mt-[33px] aspect-[1/1] overflow-hidden">
		<img
			class="duration-2000 group-hover/proCard:scale-135 h-full w-full object-contain"
			src={product.imageUrl}
			alt=""
		/>
	</div>
	<p class="mt-[24px] text-base">{product.name}</p>
	<p class="mt-[8px] text-sm">{product.price}</p>
</a>
