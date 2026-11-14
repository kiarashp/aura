<script>
	import { getCart } from '$lib/components/CartProducts.svelte.js';
	import { goto } from '$app/navigation';
	import ProductsGrid from '$lib/components/ProductsGrid.svelte';
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import { formatPrice } from '$lib/format';

	let cart = getCart();

	const { data } = $props();

	let amount = $state(1);

	function increaseAmount() {
		if (amount < 99) amount += 1;
	}
	function decreaseAmount() {
		if (amount > 1) amount -= 1;
	}
	function handleClickAddToCart() {
		cart.addToCart(data.product, amount);
		goto('/cart');
	}
</script>

<svelte:head>
	<title>{data.product.name} | Aura</title>
	<meta name="description" content={data.product.description ?? data.product.name} />
</svelte:head>

<div class="bg-surface-50 dark:bg-primary-900 grid grid-cols-2 lg:pr-[80px]">
	<div class="col-span-2 lg:col-span-1 aspect-square">
		<img src={data.product.imageUrl} alt={data.product.name} class="h-full w-full object-cover" />
	</div>
	<div
		class="col-span-2 flex flex-col px-[25px] py-[55px] md:px-[80px] lg:col-span-1 lg:px-0 lg:pl-[80px]"
	>
		<h1 class="header mt-[91px] font-bold">{data.product.name}</h1>
		<p class="mt-[13px] text-xl font-semibold">{formatPrice(data.product.price)}</p>
		<p class="mt-[54px] text-lg font-semibold">Description</p>
		<p class="smalltext mt-[16px]">{data.product.description}</p>
		<!-- highlights -->
		<ul class="mt-[20px] list-inside list-disc pl-8">
			{#each data.product.highlights as highlight}
				<li class="smalltext mt-2">{highlight}</li>
			{/each}
		</ul>
		<!-- table -->
		<p class="mt-[50px] text-lg font-semibold">Dimensions</p>
		<div class="mt-[28px]"></div>
		<div class="grid w-full grid-cols-3 lg:w-1/2">
			<p class="smalltext font-semibold">Height</p>
			<p class="smalltext font-semibold">Width</p>
			<p class="smalltext font-semibold">Depth</p>
			<p class="smalltext">{data.product.height} cm</p>
			<p class="smalltext">{data.product.width} cm</p>
			<p class="smalltext">{data.product.depth} cm</p>
		</div>

		<div class="col-span-3 mt-[34px] grid grid-cols-12 lg:gap-3 gap-0">
			<!-- amount -->
			<p class="text-lg font-semibold col-span-6 lg:col-span-3">Amount:</p>
			<div
				class="bg-tertiary-100 dark:bg-tertiary-contrast-100 flex justify-self-end lg:justify-self-auto col-span-6 w-full max-w-[200px] lg:col-span-5"
			>
				<button
					onclick={decreaseAmount}
					aria-label="decrease amount"
					disabled={amount <= 1}
					class="touch-manipulation hover:bg-surface-600 dark:hover:bg-tertiary-800 group/minus active:bg-primary-950 flex w-1/3 cursor-pointer items-center justify-center duration-300"
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
					disabled={amount >= 99}
					class="touch-manipulation hover:bg-surface-600 dark:hover:bg-tertiary-800 group/plus active:bg-primary-950 flex w-1/3 cursor-pointer items-center justify-center duration-300"
				>
					<!-- <Icon color="rgba(202, 198, 218, 1)" icon="streamline:add-1-solid" class="w-[11px]" /> -->
					<svg
						class="group-active/plus:fill-surface-200 fill-primary-900 dark:fill-primary-contrast-900 dark:group-active/plus:fill-surface-200 w-[15px] duration-300"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" /></svg
					>
				</button>
			</div>

			<!-- add to cart-->
			<SimpleButton variant="primary" customClasses="mt-4 lg:mt-0" btnWidth="col-span-12 lg:col-span-4" onclick={handleClickAddToCart}>Add to Cart</SimpleButton>
		</div>
	</div>
</div>
<!-- related products -->
{#if data.relatedProducts.length > 0}
	<div class="bg-surface-400 dark:bg-primary-800 flex w-full flex-col defaultPadding py-7">
		<div class="text-surface-900 dark:text-surface-500 header">You might also like</div>
		<ProductsGrid
			customClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-[33px]"
			products={data.relatedProducts}
		/>
	</div>
{/if}
