<script>
	import { getCart } from '$lib/components/CartProducts.svelte.js';
	import SimpleButton from '$lib/components/SimpleButton.svelte';
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

<div class="bg-surface-50 dark:bg-primary-900 w-full px-[188px] pb-[48px] pt-[64px]">
	<div class="text-primary-800 dark:text-primary-200 text-4xl">Your shopping cart</div>
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
				{#if cartItem.product.description}
					{cartItem.product.description.length > 50
						? cartItem.product.description.substring(0, 50) + '...'
						: cartItem.product.description}
				{:else}
					No description available.
				{/if}
				<p class="text-base">€{cartItem.product.price}</p>
			</div>
			<div class="col-span-2 flex items-center justify-center gap-2 pt-[12px]">
				<div class="bg-surface-300 dark:bg-primary-100 flex w-full max-w-[122px] rounded-sm">
					<SimpleButton
						customClasses="group/minus flex items-center justify-center"
						btnWidth="w-1/3"
						btnHeight=""
						variant="ghost"
						onclick={() => {
							cart.decreaseByOne(cartItem.product);
						}}
						aria-label="increase amount"
					>
						<svg class="w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								class="fill-surface-700 group-hover/minus:fill-surface-950 dark:group-hover/minus:fill-primary-300 duration-300"
								d="M19 13H5v-2h14z"
							/></svg
						></SimpleButton
					>
					<div class="flex w-1/3 items-center justify-center">
						<span>{cartItem.quantity}</span>
					</div>
					<SimpleButton
						customClasses="group/minus flex items-center justify-center"
						btnWidth="w-1/3"
						btnHeight=""
						variant="ghost"
						onclick={() => {
							cart.increaseByOne(cartItem.product);
						}}
						aria-label="increase amount"
					>
						<svg class="w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							><path
								class="fill-surface-700 group-hover/plus:fill-surface-950 dark:group-hover/minus:fill-primary-300 duration-300"
								d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
							/></svg
						></SimpleButton
					>
				</div>
			</div>
			<div class="col-span-2 pt-[12px] text-right">
				€{(cartItem.quantity * cartItem.product.price).toFixed(2)}
			</div>
		{/each}
		<div class="bg-bordergrey col-span-10 mt-[32px] h-[2px]"></div>
		<!-- subtotal-->
		<div class="col-span-10 mt-[31px] flex justify-end gap-[16px]">
			<p class="text-primary-500 dark:text-primary-100 text-xl">Subtotal</p>
			<p class="text-lg">€{total}</p>
		</div>
		<p class="text-primary-500 dark:text-primary-100 col-span-10 mt-[12px] text-right">
			Taxes and shipping are calculated at checkout
		</p>
		<div class="col-span-10 mt-[32px] flex w-full justify-end">
			<SimpleButton
				variant="primary"
				onclick={handleCheckout}
				aria-label="go to checkout"
				btnText="Go to checkout"
			/>
		</div>
	</div>
</div>
