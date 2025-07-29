<script>
	import { getCart } from '$lib/components/CartProducts.svelte.js';
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import { goto } from '$app/navigation';
	let cart = getCart();
	let total = $derived(
		cart.cartProducts
			.reduce((sum, cartItem) => sum + cartItem.quantity * cartItem.product.price, 0)
			.toFixed(2)
	);
	const handleCheckout = async () => {
		const response = await fetch('/api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ cartProducts: cart.cartProducts })
		});
		const data = await response.json();
		// goto(data.url, { replaceState: true });
		window.location = data.url;
		console.log('data.url :', data.url);
		console.log('data :', data);
	};
</script>

<div class="bg-lightgrey w-full px-[188px] pb-[48px] pt-[64px]">
	<div class="text-darkprimary text-4xl">Your shopping cart</div>
	<div class="mt-[48px] grid grid-cols-10">
		<p class=" col-span-6">Product</p>
		<p class="col-span-2 text-center">Quantity</p>
		<p class="col-span-2 text-right">Total</p>
		<div class="bg-bordergrey col-span-10 mt-[12px] h-[2px]"></div>

		{#each cart.cartProducts as cartItem (cartItem.product.id)}
			<div class="col-span-10 mt-[20px]"></div>
			<div class="col-span-1 aspect-[134/109]">
				<img src={cartItem.product.imageUrl} alt="product looks" />
			</div>
			<div class="col-span-5 flex flex-col gap-[8px] py-[12px] pl-[24px] pr-[120px]">
				<p class="text-2xl">{cartItem.product.name}</p>
				<p class="text-xl">{cartItem.product.shortDescription}</p>
				<p class="text-base">€{cartItem.product.price}</p>
			</div>
			<div class="col-span-2 flex items-center justify-center gap-2 pt-[12px]">
				<div class="bg-lightgrey flex w-full max-w-[122px]">
					<button
						onclick={() => {
							cart.decreaseByOne(cartItem.product);
						}}
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
						<span>{cartItem.quantity}</span>
					</div>
					<button
						onclick={() => {
							cart.increaseByOne(cartItem.product);
						}}
						aria-label="increase amount"
						class="hover:bg-borderdark group/plus active:bg-darkprimary flex w-1/3 cursor-pointer items-center justify-center duration-300"
					>
						<svg class="w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							><path
								class="group-hover/plus:fill-darkprimary fill-[rgba(202,198,218,1)] duration-300"
								d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
							/></svg
						>
					</button>
				</div>
			</div>
			<div class="col-span-2 pt-[12px] text-right">
				€{(cartItem.quantity * cartItem.product.price).toFixed(2)}
			</div>
		{/each}
		<div class="bg-bordergrey col-span-10 mt-[32px] h-[2px]"></div>
		<!-- subtotal-->
		<div class="col-span-10 mt-[31px] flex justify-end gap-[16px]">
			<p class="text-primary text-xl">Subtotal</p>
			<p class="text-lg">€{total}</p>
		</div>
		<p class="text-primary col-span-10 mt-[12px] text-right">
			Taxes and shipping are calculated at checkout
		</p>
		<div class="col-span-10 mt-[32px] flex w-full justify-end">
			<button
				aria-label="go to checkout"
				onclick={handleCheckout}
				class=" hover:bg-primary bg-darkprimary min-h-[56px] w-full max-w-[172px] cursor-pointer text-white transition duration-300"
				><span>Go to checkout</span></button
			>
		</div>
	</div>
</div>
