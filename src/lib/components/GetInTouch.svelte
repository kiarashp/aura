<script lang="ts">
	import { linkButtonSecondary } from '$lib/ui';
	import { imageSet } from '$lib/images';
	import { reveal } from '$lib/actions/reveal';
</script>

<!-- "Behind Aura": what this project is, with a link to the About page. -->
<section class="bg-tertiary-100 dark:bg-primary-900 defaultPadding py-20 md:py-28">
	<div class="mx-auto grid max-w-[1800px] items-center gap-10 lg:grid-cols-2 lg:gap-20">
		<div use:reveal class="order-2 lg:order-1">
			<p class="text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-[0.18em]">
				Behind Aura
			</p>
			<h2 class="text-primary-950 dark:text-surface-50 mt-3 text-4xl font-semibold md:text-5xl">
				A small shop, built in full
			</h2>
			<p class="text-surface-900 dark:text-tertiary-300 mt-6 text-lg leading-relaxed">
				Aura is a portfolio project: a complete small shop, built to show how the parts of a real
				online store fit together.
			</p>
			<p class="text-surface-900 dark:text-tertiary-300 mt-4 text-lg leading-relaxed">
				Products, prices and orders live in a PostgreSQL database. Payments go through Stripe, and
				Stripe tells the shop when an order is paid. The pages are built with SvelteKit.
			</p>
			<a href="/about" class="{linkButtonSecondary} mt-8">How it's built</a>
		</div>
		<div use:reveal={120} class="order-1 lg:order-2">
			<img
				src="/about/shop.webp"
				srcset={imageSet('/about/shop.webp')}
				sizes="(min-width: 1024px) 45vw, 90vw"
				alt="A light oak sideboard with pale vases next to a soft mint lounge chair"
				loading="lazy"
				class="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgb(42_37_75/0.5)] lg:aspect-square"
			/>
		</div>
	</div>
</section>
