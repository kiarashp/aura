<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Product } from '@prisma/client';
	interface props extends HTMLAnchorAttributes {
		product: Product;
		imageClass?: string;
		extraClass?: string;
	}
	let { product ,extraClass,imageClass = 'h-[350px]',...restProps}:props = $props();
	let productUrl = '/products/' + product.id;
	
</script>

<a 
	href={productUrl} 
	class="group/proCard flex flex-col hover:cursor-pointer transform transition-all
	 duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-2 
	 rounded-lg overflow-hidden bg-surface-300 dark:bg-primary-300
	 hover:bg-gradient-to-br hover:from-surface-50 hover:to-surface-400
	 dark:hover:from-primary-300
	 dark:hover:to-primary-400
	 {extraClass}" 
	{...restProps}
>
	<div class="{imageClass}  overflow-hidden relative">
		<img
			class="duration-700 group-hover/proCard:scale-110 h-full w-full object-cover object-center transition-all ease-out group-hover/proCard:brightness-110 group-hover/proCard:contrast-105"
			src={product.imageUrl}
			alt="{product.name}"
		/>
	</div>
	<div class="p-2 transition-all duration-300 group-hover/proCard:px-3">
		<p class="mt-[24px] text-base font-medium transition-all duration-300
		dark:text-surface-950
		group-hover/proCard:font-semibold ">
			{product.name}
		</p>
		<p class="mt-[8px] text-sm text-surface-950 ">
			{product.price}
		</p>
	</div>
</a>