<script>
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import ProductsGrid from '$lib/components/ProductsGrid.svelte';
	import GetInTouch from '$lib/components/GetInTouch.svelte';
	import JointTheClub from '$lib/components/JointTheClub.svelte';
	import WhatMakesOurBrand from '$lib/components/WhatMakesOurBrand.svelte';
	import TwoSlide from '$lib/components/TwoSlide.svelte';
	import { goto } from '$app/navigation';
	const { data } = $props();
</script>

<TwoSlide />

<WhatMakesOurBrand />

<!-- New products -->
<div class="bg-surface-50 dark:bg-primary-900 defaultPadding flex flex-col pt-[80px]">
	<p class="header">New products</p>

	<div class="pt-[40px] md:pt-[80px]">
		<!-- Mobile scrollable container (hidden on md and up) -->
		<div class="scrollbar-hide overflow-x-auto md:hidden">
			<div class="flex max-w-max gap-4 pb-4">
				{#each data.products.slice(0, 4) as product}
					<div class="w-[70vw] flex-shrink-0">
						<ProductCard {product} />
					</div>
				{/each}
			</div>
		</div>

		<!-- Desktop grid (hidden on mobile, shown on md and up) -->
		<div class="hidden md:block">
			<ProductsGrid
				customClass="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
				products={data.products.slice(0, 4)}
			/>
		</div>
	</div>

	<div class="mt-[35px] flex items-center justify-center">
		<SimpleButton
			btnText="View all"
			onclick={() => {
				goto('/products');
			}}
		/>
	</div>
</div>

<!-- populer products -->
<div class="bg-surface-50 dark:bg-primary-900 defaultPadding flex flex-col py-[64px]">
	<p class="header">Our popular products</p>
	<!-- products -->
	<div class="grid grid-cols-1 gap-6 pt-[80px] sm:grid-cols-2 xl:grid-cols-5">
		{#each data.products.slice(7, 11) as product, index (product.id)}
			<ProductCard
				{product}
				extraClass={index % 4 === 0 ? 'xl:col-span-2' : 'xl:col-span-1'}
				imageClass="h-[300px]"
			/>
		{/each}
	</div>
	<div class="mt-[35px] flex items-center justify-center">
		<SimpleButton
			btnText="View all"
			onclick={() => {
				goto('/products');
			}}
		/>
	</div>
</div>

<JointTheClub />
<GetInTouch />
