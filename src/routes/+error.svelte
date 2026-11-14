<script lang="ts">
	import { page } from '$app/state';
	import MessagePage from '$lib/components/MessagePage.svelte';
	import { linkButton, linkButtonSecondary } from '$lib/ui';

	// Say what really happened: a missing page is not the same as a broken server.
	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Page not found' : 'Something went wrong'} | Aura</title>
	<meta name="robots" content="noindex" />
</svelte:head>

{#if notFound}
	<MessagePage
		title="Page not found"
		message="We couldn't find the page you're looking for. It may have been moved, or the link may be wrong."
	>
		<a href="/" class={linkButton}>Back to home</a>
		<a href="/categories" class={linkButtonSecondary}>Browse products</a>
	</MessagePage>
{:else}
	<MessagePage
		title="Something went wrong"
		message="This page could not be loaded right now. Please try again in a moment."
	>
		<button class="{linkButton} cursor-pointer" onclick={() => location.reload()}>Try again</button>
		<a href="/" class={linkButtonSecondary}>Back to home</a>
	</MessagePage>
{/if}
