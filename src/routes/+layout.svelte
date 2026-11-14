<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import DemoBanner from '$lib/components/DemoBanner.svelte';
	import { setCart } from '$lib/components/CartProducts.svelte';

	let { children, data } = $props();

	const cart = setCart();
	// The saved cart lives in the browser, so read it only once the page runs there.
	onMount(() => cart.loadFromLocalStorage());
</script>

<svelte:head>
	<title>Aura | Timeless furniture</title>
	<meta
		name="description"
		content="Aura is a demo furniture shop: browse products, fill a cart and pay with a Stripe test card."
	/>
</svelte:head>

<div class="mx-auto flex min-h-screen max-w-[1800px] flex-col">
	<DemoBanner />
	<Header allCategories={data.allCategories} />
	<main class="flex grow flex-col">
		{@render children()}
	</main>
	<Footer categories={data.allCategories} />
</div>
