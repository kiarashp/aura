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
<div class="bg-surface-50 dark:bg-primary-900 flex flex-col defaultPadding pt-[80px]">
	<p class="header">New products</p>
	
	<div class="pt-[40px] md:pt-[80px]">
		<!-- Mobile scrollable container (hidden on md and up) -->
		<div class="md:hidden overflow-x-auto scrollbar-hide">
			<div class="flex gap-4 pb-4 max-w-max" >
				{#each data.products.slice(0, 4) as product}
					<div class="flex-shrink-0 w-[70vw]"> 
						<ProductCard {product} />
					</div>
				{/each}
			</div>
		</div>
		
		<!-- Desktop grid (hidden on mobile, shown on md and up) -->
		<div class="hidden md:block">
			<ProductsGrid customClass="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6" products={data.products.slice(0, 4)} />
		</div>
	</div>
	
	<div class="mt-[35px] flex items-center justify-center">
		<SimpleButton btnText="View all" />
	</div>
</div>



<!-- populer products -->
<div class="bg-surface-50 dark:bg-primary-900 flex flex-col defaultPadding py-[64px]">
	<p class="header">Our popular products</p>
	<!-- products -->
	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 pt-[80px]">
		{#each data.products.slice(7, 11) as product, index (product.id)}
			<ProductCard {product} extraClass={index % 4 === 0 ? 'xl:col-span-2' : 'xl:col-span-1'}  imageClass="h-[300px]"/>
		{/each}
	</div>
	<div class="mt-[35px] flex items-center justify-center">
		<SimpleButton btnText="View all" />
	</div>
</div>

<JointTheClub />
<GetInTouch />
