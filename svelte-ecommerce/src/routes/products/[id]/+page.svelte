<script>
	import ProductCard from '$lib/components/ProductCard.svelte';
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import { getCart } from '$lib/components/CartProducts.svelte.js';

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
</script>

<div class="grid grid-cols-2 pr-[80px]">
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
				<li class="mt-2 text-base text-gray-700">{highlight}</li>
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
				<div class="bg-lightgrey flex w-full max-w-[122px]">
					<button
						onclick={decreaseAmount}
						aria-label="increase amount"
						class="hover:bg-borderdark group/minus active:bg-darkprimary flex w-1/3 cursor-pointer items-center justify-center duration-300"
					>
						<svg class="w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								class="group-hover/minus:fill-darkprimary fill-[rgba(202,198,218,1)] duration-300"
								d="M19 13H5v-2h14z"
							/></svg
						>
					</button>
					<div class="flex w-1/3 items-center justify-center">
						<span>{amount}</span>
					</div>
					<button
						onclick={increaseAmount}
						aria-label="increase amount"
						class="hover:bg-borderdark group/plus active:bg-darkprimary flex w-1/3 cursor-pointer items-center justify-center duration-300"
					>
						<!-- <Icon color="rgba(202, 198, 218, 1)" icon="streamline:add-1-solid" class="w-[11px]" /> -->
						<svg class="w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							><path
								class="group-hover/plus:fill-darkprimary fill-[rgba(202,198,218,1)] duration-300"
								d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
							/></svg
						>
					</button>
				</div>
			</div>
			<!-- add to cart-->
			<button
				onclick={() => cart.addToCart(data.product, amount)}
				class=" hover:bg-primary bg-darkprimary active:bg-borderdark min-h-[56px] w-full max-w-[143px]
			  cursor-pointer text-white transition duration-300"
			>
				<span>Add to Cart</span>
			</button>
		</div>
	</div>
</div>
<div class="flex w-full flex-col p-[80px]">
	<div class="text-darkprimary text-2xl">You might also like</div>
	<div class="mt-[33px] grid grid-cols-4 gap-[30px]">
		{#each data.relatedProducts.products as product (product.id)}
			<ProductCard {product} customClass="col-span-1" />
		{/each}
	</div>
</div>
