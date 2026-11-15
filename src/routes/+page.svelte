<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Hero from '$lib/components/Hero.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import GetInTouch from '$lib/components/GetInTouch.svelte';
	import WhatMakesOurBrand from '$lib/components/WhatMakesOurBrand.svelte';
	import { reveal } from '$lib/actions/reveal';

	const { data } = $props();
	const newProducts = $derived(data.products.slice(0, 4));
	const popular = $derived(data.products.slice(7, 12));
</script>

{#snippet sectionHead(eyebrow: string, title: string)}
	<div use:reveal class="flex items-end justify-between gap-6">
		<div>
			<p class="text-mint-600 dark:text-mint-300 text-xs font-semibold uppercase tracking-[0.18em]">
				{eyebrow}
			</p>
			<h2 class="text-primary-950 dark:text-surface-50 mt-3 text-4xl font-semibold md:text-5xl">{title}</h2>
		</div>
		<a
			href="/categories"
			class="text-primary-800 hover:text-primary-500 dark:text-tertiary-300 dark:hover:text-mint-300 group hidden shrink-0 items-center gap-2 font-medium sm:flex"
		>
			View all <ArrowRight size={18} class="transition-transform group-hover:translate-x-1" aria-hidden="true" />
		</a>
	</div>
{/snippet}

<Hero />

<WhatMakesOurBrand />

<!-- New products: a sideways-scrolling row on phones, a grid on wider screens -->
<section class="bg-surface-50 dark:bg-primary-950 defaultPadding pb-20 md:pb-28">
	<div class="mx-auto max-w-[1800px]">
		{@render sectionHead('Just in', 'New products')}
		<div
			class="-mx-[25px] mt-10 flex snap-x snap-mandatory scroll-px-[25px] gap-4 overflow-x-auto px-[25px] pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 xl:grid-cols-4"
		>
			{#each newProducts as product, i (product.id)}
				<div use:reveal={i * 100} class="w-[72vw] shrink-0 snap-start md:w-auto">
					<ProductCard {product} />
				</div>
			{/each}
		</div>
		<a href="/categories" class="text-primary-800 dark:text-tertiary-300 mt-4 inline-flex items-center gap-2 font-medium sm:hidden">
			View all <ArrowRight size={18} aria-hidden="true" />
		</a>
	</div>
</section>

<!-- Popular: one big card and four small ones -->
<section class="bg-surface-50 dark:bg-primary-950 defaultPadding pb-20 md:pb-28">
	<div class="mx-auto max-w-[1800px]">
		{@render sectionHead('Most loved', 'Popular right now')}
		<div class="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
			{#each popular as product, i (product.id)}
				<div use:reveal={i * 90} class={i === 0 ? 'col-span-2 lg:row-span-2' : ''}>
					<ProductCard
						{product}
						sizes={i === 0 ? '(min-width: 1024px) 50vw, 90vw' : '(min-width: 1024px) 25vw, 45vw'}
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<GetInTouch />
