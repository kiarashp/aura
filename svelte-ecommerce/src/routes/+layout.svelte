<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { setCart } from '$lib/components/CartProducts.svelte';
	let theCart = setCart();
	theCart.loadFromLocalStorage()
	let { children, data } = $props();
</script>

<div class="mx-auto flex min-h-screen max-w-[1800px] flex-col ">
	<Header allCategories={data.allCategories} />
	<!-- <HeaderSimple allCategories={data.allCategories}/> -->
	{@render children()}
	<Footer categories={data.allCategories} />
</div>
