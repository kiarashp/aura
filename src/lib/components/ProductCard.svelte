<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Product } from '@prisma/client';
	import { fade } from 'svelte/transition';
	import { formatPrice } from '$lib/format';
	

	interface props extends HTMLAnchorAttributes {
		product: Product;
		imageClass?: string;
		extraClass?: string;
	}
	let { product, extraClass, imageClass = 'h-[350px]', ...restProps }: props = $props();
	let productUrl = '/products/' + product.id;
</script>

<a
	href={productUrl}
	class="group/proCard bg-surface-300 dark:bg-primary-300 hover:from-surface-50 hover:to-surface-400 dark:hover:from-primary-300
	 dark:hover:to-primary-400 flex transform flex-col overflow-hidden rounded-lg
	 transition-all duration-300 ease-out hover:-translate-y-2
	 hover:scale-105 hover:cursor-pointer hover:bg-gradient-to-br
	 hover:shadow-2xl
	 hover:shadow-black/20
	 {extraClass}"
	 in:fade={{ duration: 800 }}
	{...restProps}
>
	<div class="{imageClass}  relative overflow-hidden">
		<img
			class="group-hover/proCard:contrast-105 h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover/proCard:scale-110 group-hover/proCard:brightness-110"
			src={product.imageUrl}
			alt={product.name}
		/>
	</div>
	<div class="p-2 transition-all duration-300 group-hover/proCard:px-3">
		<p
			class="dark:text-surface-950 mt-[24px] text-base font-medium transition-all
		duration-300
		group-hover/proCard:font-semibold"
		>
			{product.name}
		</p>
		<p class="text-surface-950 mt-[8px] text-sm">
			{formatPrice(product.price)}
		</p>
	</div>
</a>
