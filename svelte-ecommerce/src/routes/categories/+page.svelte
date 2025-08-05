<script lang="ts">
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import ProductsGrid from '$lib/components/ProductsGrid.svelte';

	const { data } = $props();
	console.log(data);

	let priceRanges = [
		{ label: 'Under €50', value: 'under-50' },
		{ label: '€50 - €100', value: '50-100' },
		{ label: '€100 - €200', value: '100-200' },
		{ label: 'Over €200', value: 'over-200' }
	];
	let wholeProducts = $derived(data.products);
	let products = $derived(data.products?.slice(0, 3) || []);
	let isMore = $derived(data.products?.length > 3);

	function handleLoadMore() {
		products = [...products, ...(data.products?.slice(3) || [])];
		isMore = false;
	}
	function filterProduct(e: Event) {
		const target = e.target as HTMLInputElement;
		const isItChecked = target.checked;
		const nameCategory = target.name;
		if (!isItChecked) {
			return;
		}
		let newp = wholeProducts.filter(function (each) {
			console.log(each.category.name);
			console.log(nameCategory);
			if (each.category.name === nameCategory) {
				return true;
			} else {
				return false;
			}
		});
		products = newp
		console.log(newp);
	}
</script>

<div
	class="defaultPadding relative flex h-[209px] w-full items-end bg-cover bg-bottom pb-[36px]"
	style="background-image: url('/general/decorative-11.jpg');"
>
	<span class=" bg-primary-950 absolute inset-0 z-0 opacity-30"></span>

	<p class=" text-surface-100 bigHeader z-10">All products</p>
</div>
<div class="bg-surface-200 dark:bg-primary-900 defaultPadding flex flex-row">
	<!-- filters -->
	<div class="w-2/5 px-2 pt-[48px] sm:w-1/4">
		<div class="flex flex-col items-start">
			<!-- categories -->
			<p class="text-base font-semibold md:text-lg">Product Categories</p>
			<div class="mt-[20px] flex flex-col gap-[13px]">
				{#each data.categories as category (category.name)}
					<label class="hover:text-secondary-700 cursor-pointer select-none text-base">
						<input type="checkbox" name={category.name} onchange={filterProduct} />
						{category.name}
					</label>
				{/each}
			</div>
			<!-- price -->
			<p class="mt-[48px] text-base font-semibold md:text-lg">Price</p>
			<div class="mt-[20px] flex flex-col gap-[13px]">
				{#each priceRanges as range (range.label)}
					<label class=" hover:text-secondary-700 cursor-pointer select-none text-base">
						<input type="checkbox" name={range.value} id="" />
						{range.label}
					</label>
				{/each}
			</div>
		</div>
	</div>
	<!-- products -->
	<div class="mt-[33px] w-3/5 py-[36px] sm:w-3/4">
		<ProductsGrid
			{products}
			customClass="grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 "
			customImageClass="h-auto "
		/>
		<div class=" flex w-full items-center justify-center">
			{#if isMore}
				<SimpleButton btnText="Load more" onclick={handleLoadMore} />
			{/if}
		</div>
	</div>
</div>
