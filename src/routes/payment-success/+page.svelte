<script lang="ts">
	import { onMount } from 'svelte';
	import { getCart } from '$lib/components/CartProducts.svelte';
	import MessagePage from '$lib/components/MessagePage.svelte';
	import { linkButton, linkButtonSecondary } from '$lib/ui';

	const cart = getCart();
	// The order is paid, so empty the cart (in memory and in the browser's saved copy).
	onMount(() => {
		cart.loadFromLocalStorage();
		cart.clear();
	});
</script>

<svelte:head>
	<title>Payment successful | Aura</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<MessagePage
	title="Payment successful"
	message="Thank you! This is a demo shop, so the test payment went through but nothing will be shipped."
	image="/general/simple-chair-5.png"
>
	<a href="/" class={linkButton}>Back to home</a>
	<a href="/categories" class={linkButtonSecondary}>Keep browsing</a>
</MessagePage>
