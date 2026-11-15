<script lang="ts">
	import type { Snippet } from 'svelte';
	import LogoMark from './brand/LogoMark.svelte';

	// One centred message with the glowing logo mark, a title, a message and links.
	// Used by the error page and the payment result pages so they all look the same.
	interface Props {
		title: string;
		message: string;
		children?: Snippet; // the buttons
	}
	let { title, message, children }: Props = $props();
</script>

<section class="defaultPadding relative isolate flex grow items-center justify-center overflow-hidden py-20">
	<div class="aura-glow absolute left-1/2 top-1/2 -z-10 size-[520px] -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>
	<div class="flex w-full max-w-[560px] flex-col items-center text-center">
		<LogoMark size={120} class="rise-in" />
		<h1 class="rise-in text-primary-950 dark:text-surface-50 mt-8 text-4xl font-semibold md:text-5xl" style="animation-delay: 100ms">
			{title}
		</h1>
		<p class="rise-in text-surface-900 dark:text-tertiary-300 mt-5 text-lg leading-relaxed" style="animation-delay: 200ms">
			{message}
		</p>
		{#if children}
			<div class="rise-in mt-10 flex flex-wrap justify-center gap-3" style="animation-delay: 300ms">
				{@render children()}
			</div>
		{/if}
	</div>
</section>
