<script lang="ts">
	import type { Snippet } from 'svelte';

	// One centred card with a picture, a title, a message and links.
	// Used by the error page and the payment result pages so they all look the same.
	interface Props {
		title: string;
		message: string;
		image?: string;
		children?: Snippet; // the buttons
	}
	let { title, message, image = '/general/simple-chair-1.webp', children }: Props = $props();
</script>

<section
	class="bg-surface-50 dark:bg-primary-900 defaultPadding flex grow items-center justify-center py-16"
>
	<div class="flex w-full max-w-[560px] flex-col items-center text-center">
		<img src={image} alt="" width="1000" height="1000" class="h-auto w-[180px] drop-shadow-lg sm:w-[220px]" />
		<h1 class="text-primary-950 dark:text-surface-100 bigHeader mt-10 font-semibold">{title}</h1>
		<p class="text-surface-900 dark:text-surface-300 subheader mt-5">{message}</p>
		{#if children}
			<div class="mt-10 flex flex-wrap justify-center gap-4">
				{@render children()}
			</div>
		{/if}
	</div>
</section>

