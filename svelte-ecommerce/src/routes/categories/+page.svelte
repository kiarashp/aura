<script>
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';

	const { data } = $props();
	console.log(data);
	 let categories = data.categories || [];
	 let products = data.products || [];
	 


	let priceRanges = [
		{ label: 'Under €50', value: 'under-50' },
		{ label: '€50 - €100', value: '50-100' },
		{ label: '€100 - €200', value: '100-200' },
		{ label: 'Over €200', value: 'over-200' }
	];
</script>

<div
	class="relative flex h-[209px] w-full items-end bg-cover bg-bottom pb-[36px] pl-[80px]"
	style="background-image: url('/general/decorative-11.jpg');"
>
	<span class=" bg-darkprimary absolute inset-0 z-0 opacity-30"></span>

	<p class=" z-10 text-3xl text-white">All products</p>
</div>
<div class="flex px-[80px]">
	<!-- filters -->
	<div class="w-1/4 px-2 pt-[48px]">
		<div class="flex flex-col items-start">
			<!-- categories -->
			<p class="text-lg">Product Categories</p>
			<div class="mt-[20px] flex flex-col gap-[13px]">
				{#each categories as category (category.name)}
					<label class="text-darkprimary hover:text-primary cursor-pointer select-none text-base">
						<input type="checkbox" name={category.name} id="" />
						{category.name}
					</label>
				{/each}
			</div>
			<!-- price -->
			<p class="mt-[48px] text-lg">Price</p>
			<div class="mt-[20px] flex flex-col gap-[13px]">
				{#each priceRanges as range (range.label)}
					<label class="text-darkprimary hover:text-primary cursor-pointer select-none text-base">
						<input type="checkbox" name={range.value} id="" />
						{range.label}
					</label>
				{/each}
			</div>
		</div>
	</div>
	<!-- products -->
	<div class="grid w-3/4 grid-cols-3 gap-4 py-[36px]">
		{#each products as product, index (product.id)}
			<ProductCard {product} customClass="col-span-1" />
		{/each}
		<div class="col-span-3 flex w-full items-center justify-center">
			<SimpleButton btnText="Load more" btnWidth="w-[176px]" />
		</div>
	</div>
</div>
