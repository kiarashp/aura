<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/fraunces';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import DemoBanner from '$lib/components/DemoBanner.svelte';
	import { setCart } from '$lib/components/CartProducts.svelte';
	import { onNavigate } from '$app/navigation';
	import Toast from '$lib/components/Toast.svelte';

	let { children, data } = $props();

	const cart = setCart();
	// The saved cart lives in the browser, so read it only once the page runs there.
	onMount(() => cart.loadFromLocalStorage());

	// Smooth page changes: the old page fades into the new one, and a product picture glides from its
	// card to the product page (both carry the same view-transition-name). Browsers without
	// support, and visitors who asked for less motion, just get a normal page change.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Aura | Quiet furniture for everyday rooms</title>
	<meta
		name="description"
		content="Aura is a demo furniture shop: browse products, fill a cart and pay with a Stripe test card."
	/>
</svelte:head>

<div class="bg-surface-50 dark:bg-primary-950 flex min-h-screen flex-col">
	<DemoBanner />
	<Header allCategories={data.allCategories} />
	<main class="flex grow flex-col">
		{@render children()}
	</main>
	<Footer categories={data.allCategories} />
	<Toast />
</div>
