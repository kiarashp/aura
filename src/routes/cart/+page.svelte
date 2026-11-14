<script lang="ts">
	import { getCart } from '$lib/components/CartProducts.svelte';
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import { formatPrice } from '$lib/format';
	import { linkButton } from '$lib/ui';

	const { data } = $props();
	const cart = getCart();

	let checkingOut = $state(false);
	let checkoutError = $state('');

	// Once the saved cart is read, swap in today's names and prices from the shop.
	let refreshed = false;
	$effect(() => {
		if (cart.loaded && !refreshed && data.products.length > 0) {
			refreshed = true;
			cart.refresh(data.products);
		}
	});

	let total = $derived(
		cart.cartProducts.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
	);

	async function handleCheckout() {
		checkingOut = true;
		checkoutError = '';
		try {
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					items: cart.cartProducts.map((i) => ({ id: i.product.id, quantity: i.quantity }))
				})
			});
			const result = await response.json().catch(() => ({}));
			if (response.ok && result.url) {
				window.location.href = result.url;
				return;
			}
			checkoutError = result.message ?? 'Checkout is not available right now. Please try again.';
		} catch {
			checkoutError = 'Could not reach the shop. Check your connection and try again.';
		}
		checkingOut = false;
	}
</script>

<svelte:head>
	<title>Your cart | Aura</title>
</svelte:head>

<div
	class="bg-surface-50 dark:bg-primary-900 w-full grow px-[25px] pb-[48px] pt-[64px] md:px-[80px] lg:px-[150px]"
>
	<h1 class="text-primary-800 dark:text-primary-200 bigHeader">Your shopping cart</h1>

	{#if !cart.loaded}
		<!-- Reading the saved cart; takes a split second. -->
		<div class="min-h-[200px]"></div>
	{:else if cart.cartProducts.length === 0}
		<div class="mt-[48px] flex flex-col items-start gap-6">
			<p class="subheader">Your cart is empty.</p>
			<a
				href="/categories"
				class={linkButton}
			>
				Browse products
			</a>
		</div>
	{:else}
		<div class="mt-[48px] grid grid-cols-12 gap-x-2 md:gap-x-4">
			<p class="subheader col-span-6">Product</p>
			<p class="subheader col-span-3 text-center">Quantity</p>
			<p class="subheader col-span-3 text-right">Total</p>
			<div class="bg-surface-600 col-span-12 mt-[12px] h-[2px]"></div>

			{#each cart.cartProducts as cartItem (cartItem.product.id)}
				<div class="col-span-12 mt-[20px]"></div>
				<a href="/products/{cartItem.product.id}" class="col-span-2">
					<img src={cartItem.product.imageUrl} alt={cartItem.product.name} />
				</a>
				<div class="col-span-4 flex flex-col gap-[8px]">
					<a
						href="/products/{cartItem.product.id}"
						class="text-sm hover:underline md:text-base lg:text-xl">{cartItem.product.name}</a
					>
					<p class="hidden text-sm md:block">
						{#if cartItem.product.description}
							{cartItem.product.description.length > 50
								? cartItem.product.description.substring(0, 50) + '...'
								: cartItem.product.description}
						{/if}
					</p>
					<p class="smalltext">{formatPrice(cartItem.product.price)}</p>
					<button
						class="smalltext text-surface-800 dark:text-surface-400 w-max cursor-pointer underline hover:no-underline"
						onclick={() => cart.removeFromCart(cartItem.product)}
					>
						Remove
					</button>
				</div>
				<div class="col-span-3 flex items-end justify-center gap-2">
					<div class="bg-surface-300 dark:bg-primary-100 flex w-full max-w-[122px] rounded-sm">
						<SimpleButton
							customClasses="group/minus flex items-center justify-center"
							btnWidth="w-1/3"
							btnHeight="min-h-[40px]"
							variant="ghost"
							onclick={() => cart.decreaseByOne(cartItem.product)}
							aria-label="decrease amount"
						>
							<svg class="w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									class="fill-surface-700 group-hover/minus:fill-surface-950 dark:group-hover/minus:fill-primary-300 duration-300"
									d="M19 13H5v-2h14z"
								/></svg
							></SimpleButton
						>
						<div
							class="text-surface-950 dark:text-surface-900 flex w-1/3 items-center justify-center"
						>
							<span>{cartItem.quantity}</span>
						</div>
						<SimpleButton
							customClasses="group/plus flex items-center justify-center"
							btnWidth="w-1/3"
							btnHeight="min-h-[40px]"
							variant="ghost"
							onclick={() => cart.increaseByOne(cartItem.product)}
							disabled={cartItem.quantity >= 99}
							aria-label="increase amount"
						>
							<svg class="w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								><path
									class="fill-surface-700 group-hover/plus:fill-surface-950 dark:group-hover/plus:fill-primary-300 duration-300"
									d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
								/></svg
							></SimpleButton
						>
					</div>
				</div>
				<div class="col-span-3 flex items-end justify-end text-sm md:text-base">
					{formatPrice(cartItem.quantity * cartItem.product.price)}
				</div>
			{/each}
			<div class="bg-bordergrey col-span-12 mt-[32px] h-[2px]"></div>
			<!-- subtotal-->
			<div class="col-span-12 mt-[31px] flex justify-end gap-[16px]">
				<p class="text-primary-500 dark:text-primary-100 text-xl">Subtotal</p>
				<p class="text-lg">{formatPrice(total)}</p>
			</div>
			<p class="text-primary-500 dark:text-primary-100 col-span-12 mt-[12px] text-right">
				No tax or shipping: this is a demo shop
			</p>
			{#if checkoutError}
				<p class="text-error-600 dark:text-error-400 col-span-12 mt-[16px] text-right" role="alert">
					{checkoutError}
				</p>
			{/if}
			<div class="col-span-12 mt-[32px] flex w-full justify-end">
				<SimpleButton
					variant="primary"
					onclick={handleCheckout}
					disabled={checkingOut}
					btnText={checkingOut ? 'Opening checkout…' : 'Go to checkout'}
				/>
			</div>
		</div>
	{/if}
</div>
