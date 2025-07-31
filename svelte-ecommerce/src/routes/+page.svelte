<script>
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import ProductsGrid from '$lib/components/ProductsGrid.svelte';
	import GetInTouch from '$lib/components/GetInTouch.svelte';
	import JointTheClub from '$lib/components/JointTheClub.svelte';
	import WhatMakesOurBrand from '$lib/components/WhatMakesOurBrand.svelte';
	import TwoSlide from '$lib/components/TwoSlide.svelte';
	const { data } = $props();
	const products = data.products;
</script>

<TwoSlide />

<WhatMakesOurBrand />

<!-- New products -->
<div class="bg-surface-50 dark:bg-primary-900 flex flex-col px-[80px] pt-[80px]">
	<p class="text-2xl">New products</p>
	<ProductsGrid customClass="grid-cols-4 gap-6 pt-[80px]" products={data.products.slice(0, 4)} />
	<div class="mt-[35px] flex items-center justify-center">
		<SimpleButton btnText="View all" />
	</div>
</div>

<!-- populer products -->
<div class="bg-surface-50 dark:bg-primary-900 flex flex-col px-[80px] py-[64px]">
	<p class="text-2xl">Our popular products</p>
	<!-- products -->
	<div class="grid grid-cols-5 gap-6 pt-[80px]">
		{#each data.products.slice(7, 11) as product, index (product.id)}
			<ProductCard {product} extraClass={index % 4 === 0 ? 'col-span-2' : 'col-span-1'}  imageClass="h-[300px]"/>
		{/each}
	</div>
	<div class="mt-[35px] flex items-center justify-center">
		<SimpleButton btnText="View all" />
	</div>
</div>

<JointTheClub />
<GetInTouch />
