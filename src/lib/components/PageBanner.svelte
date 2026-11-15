<script lang="ts">
	import { imageSet } from '$lib/images';

	// The wide room picture at the top of the category pages, with the title on its empty wall.
	interface Props {
		image: string;
		eyebrow?: string;
		title: string;
		subtitle?: string;
	}
	let { image, eyebrow = 'Collection', title, subtitle }: Props = $props();
</script>

<section class="relative isolate flex h-[260px] items-end overflow-hidden md:h-[380px]">
	<img
		src={image}
		srcset={imageSet(image, 2400)}
		sizes="100vw"
		alt=""
		fetchpriority="high"
		class="parallax absolute inset-0 -z-20 h-full w-full object-cover object-[75%_50%]"
	/>
	<div
		class="from-surface-50/90 via-surface-50/50 dark:from-primary-950/95 dark:via-primary-950/65 dark:to-primary-950/20 absolute inset-0 -z-10 bg-gradient-to-r to-transparent"
	></div>
	<div class="defaultPadding mx-auto w-full max-w-[1800px] pb-10 md:pb-14">
		<p class="rise-in text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-[0.18em]">
			{eyebrow}
		</p>
		<h1
			class="rise-in text-primary-950 dark:text-surface-50 mt-3 text-5xl font-semibold md:text-6xl"
			style="animation-delay: 100ms"
		>
			{title}
		</h1>
		{#if subtitle}
			<p
				class="rise-in text-primary-900 dark:text-tertiary-300 mt-3 max-w-md text-lg"
				style="animation-delay: 200ms"
			>
				{subtitle}
			</p>
		{/if}
	</div>
</section>
