<script>
	import { getCart } from '$lib/components/CartProducts.svelte.js';
	import { goto } from '$app/navigation';
	import ProductsGrid from '$lib/components/ProductsGrid.svelte';
	import SimpleButton from '$lib/components/SimpleButton.svelte';

	let cart = getCart();

	const { data } = $props();

	// let shit = $derived(page.params.id);

	let amount = $state(0);

	function increaseAmount() {
		amount += 1;
	}
	function decreaseAmount() {
		if (amount > 0) {
			amount -= 1;
		}
	}
	function handleClickAddToCart() {
		cart.addToCart(data.product, amount);
		goto('/cart');
	}
</script>

<div class="bg-surface-50 dark:bg-primary-900 grid grid-cols-2 pr-[80px]">
	<div class="col-span-1">
		<img src={data.product.imageUrl} alt={data.product.name} class="h-full w-full object-cover" />
	</div>
	<div class="col-span-1 flex flex-col px-[102px] py-[55px]">
		<h1 class="mt-[91px] text-2xl font-bold">{data.product.name}</h1>
		<p class="mt-[13px] text-xl font-semibold">€{data.product.price}</p>
		<p class="mt-[54px] text-lg font-semibold">Description</p>
		<p class="mt-[16px] text-base">{data.product.description}</p>
		<!-- highlights -->
		<ul class="mt-[20px] list-inside list-disc pl-8">
			{#each data.product.highlights as highlight}
				<li class="mt-2 text-base">{highlight}</li>
			{/each}
		</ul>
		<!-- table -->
		<p class="mt-[50px] text-lg font-semibold">Dimensions</p>
		<div class="mt-[28px]"></div>
		<div class="grid w-1/2 grid-cols-3">
			<p class="text-base font-semibold">Height</p>
			<p class="text-base font-semibold">Width</p>
			<p class="text-base font-semibold">Depth</p>
			<p class="text-base">{data.product.height}</p>
			<p class="text-base">{data.product.width}</p>
			<p class="text-base">{data.product.depth}</p>
		</div>

		<div class="col-span-3 mt-[34px] flex items-center justify-between">
			<!-- amount -->
			<div class=" flex min-h-[46px] w-1/2 items-center justify-between">
				<p class="text-lg font-semibold">Amount:</p>
				<div class="bg-tertiary-100 dark:bg-tertiary-contrast-100 flex w-full max-w-[122px]">
					<button
						onclick={decreaseAmount}
						aria-label="increase amount"
						class="hover:bg-surface-600 dark:hover:bg-tertiary-800 group/minus active:bg-primary-950 flex w-1/3 cursor-pointer items-center justify-center duration-300"
					>
						<svg
							class="group-active/minus:fill-surface-200 fill-primary-900 dark:fill-primary-contrast-900 dark:group-active/plus:fill-surface-200 w-[15px] duration-300"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path d="M19 13H5v-2h14z" /></svg
						>
					</button>
					<div class="flex w-1/3 items-center justify-center">
						<span>{amount}</span>
					</div>
					<button
						onclick={increaseAmount}
						aria-label="increase amount"
						class="hover:bg-surface-600 dark:hover:bg-tertiary-800 group/plus active:bg-primary-950 flex w-1/3 cursor-pointer items-center justify-center duration-300"
					>
						<!-- <Icon color="rgba(202, 198, 218, 1)" icon="streamline:add-1-solid" class="w-[11px]" /> -->
						<svg
							class="group-active/plus:fill-surface-200 fill-primary-900 dark:fill-primary-contrast-900 dark:group-active/plus:fill-surface-200 w-[15px] duration-300"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" /></svg
						>
					</button>
				</div>
			</div>
			<!-- add to cart-->
			<SimpleButton variant="primary"  onclick={handleClickAddToCart}>Add to Cart</SimpleButton>
		</div>
	</div>
</div>
<!-- related products -->
<div class="flex w-full flex-col bg-surface-400 dark:bg-primary-800 p-[80px] ">
	<div class="text-surface-900 dark:text-surface-500 text-2xl">You might also like</div>
	<ProductsGrid
		customClass="grid-cols-4 gap-4 mt-[33px]"
		products={data.relatedProducts.products}
	/>
</div>
