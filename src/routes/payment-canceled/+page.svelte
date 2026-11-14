<script lang="ts">
	import MessagePage from '$lib/components/MessagePage.svelte';
	import { linkButton, linkButtonSecondary } from '$lib/ui';
</script>

<svelte:head>
	<title>Payment canceled | Aura</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<MessagePage
	title="Payment canceled"
	message="Your payment was not completed and nothing was charged. Your cart is still saved."
>
	<a href="/cart" class={linkButton}>Back to cart</a>
	<a href="/" class={linkButtonSecondary}>Back to home</a>
</MessagePage>
