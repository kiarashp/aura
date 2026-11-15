<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { imageSet } from '$lib/images';
	import { linkButton, linkButtonGhost } from '$lib/ui';
</script>

<!-- The home page opening: a full-width room picture, the headline sits on the empty wall. -->
<section class="relative isolate flex min-h-[calc(100svh-7rem)] items-center overflow-hidden md:min-h-[86vh]">
	<img
		src="/banners/home.webp"
		srcset={imageSet('/banners/home.webp', 2400)}
		sizes="100vw"
		alt=""
		fetchpriority="high"
		class="parallax absolute inset-0 -z-20 h-full w-full object-cover object-[80%_50%] md:object-center"
	/>
	<!-- Fades the picture behind the text so it stays readable (from the top on phones, from the left on wide screens). -->
	<div
		class="from-surface-50/90 via-surface-50/45 dark:from-primary-950/95 dark:via-primary-950/70 dark:to-primary-950/25 absolute inset-0 -z-10 bg-gradient-to-b to-transparent md:bg-gradient-to-r"
	></div>
	<div class="aura-glow absolute -left-24 top-1/4 -z-10 size-[420px] md:size-[560px]" aria-hidden="true"></div>

	<div class="defaultPadding mx-auto w-full max-w-[1800px] self-start pt-14 md:self-center md:pt-0">
		<div class="max-w-xl">
			<p
				class="rise-in bg-surface-50/70 text-primary-800 dark:bg-primary-900/70 dark:text-mint-300 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur"
			>
				<span class="bg-mint-400 size-1.5 rounded-full"></span> Demo furniture shop
			</p>
			<h1
				class="rise-in text-primary-950 dark:text-surface-50 mt-6 text-5xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl"
				style="animation-delay: 120ms"
			>
				Quiet furniture for everyday rooms
			</h1>
			<p
				class="rise-in text-primary-900 dark:text-tertiary-300 mt-6 max-w-md text-lg leading-relaxed"
				style="animation-delay: 240ms"
			>
				Sofas, tables, storage and beds in soft colours and simple shapes. Fill a cart and check out
				with a test card: it's a demo, so nothing is charged.
			</p>
			<div class="rise-in mt-9 flex flex-wrap gap-3" style="animation-delay: 360ms">
				<a href="/categories" class="{linkButton} group inline-flex items-center gap-2">
					View collection
					<ArrowRight size={18} class="transition-transform group-hover:translate-x-1" aria-hidden="true" />
				</a>
				<a href="/sign-in" class={linkButtonGhost}>Try a demo login</a>
			</div>
		</div>
	</div>

	<a
		href="#try"
		class="text-primary-800 dark:text-tertiary-300 absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce md:block"
		aria-label="Scroll down"
	>
		<ChevronDown size={28} aria-hidden="true" />
	</a>
</section>
