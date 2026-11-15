<script lang="ts">
	import { linkButton, linkButtonSecondary } from '$lib/ui';
	import { imageSet } from '$lib/images';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>About us | Aura</title>
	<meta
		name="description"
		content="Aura is a demo furniture shop built with SvelteKit, Prisma, PostgreSQL and Stripe."
	/>
</svelte:head>

<section class="defaultPadding relative isolate overflow-hidden py-20 text-center md:py-28">
	<div class="aura-glow absolute left-1/2 top-0 -z-10 size-[560px] -translate-x-1/2" aria-hidden="true"></div>
	<p class="rise-in text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-[0.18em]">
		About Aura
	</p>
	<h1
		class="rise-in text-primary-950 dark:text-surface-50 mx-auto mt-4 max-w-3xl text-5xl font-semibold md:text-6xl"
		style="animation-delay: 100ms"
	>
		A small shop, built in full
	</h1>
</section>

<!-- the shop -->
<section class="defaultPadding pb-20 md:pb-28">
	<div class="mx-auto grid max-w-[1800px] items-center gap-10 lg:grid-cols-2 lg:gap-20">
		<img
			use:reveal
			src="/about/shop.webp"
			srcset={imageSet('/about/shop.webp')}
			sizes="(min-width: 1024px) 45vw, 90vw"
			alt="A light oak sideboard with pale vases next to a soft mint lounge chair"
			class="aspect-square w-full rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgb(42_37_75/0.5)]"
		/>
		<div use:reveal={120}>
			<h2 class="text-primary-950 dark:text-surface-50 text-4xl font-semibold">The shop</h2>
			<p class="text-surface-900 dark:text-tertiary-300 mt-6 text-lg leading-relaxed">
				Aura is a made-up furniture brand with a small, calm collection: sofas and chairs, tables,
				storage and beds, in soft colours and simple shapes.
			</p>
			<p class="text-surface-900 dark:text-tertiary-300 mt-4 text-lg leading-relaxed">
				Every product page, filter, cart and checkout works like a real shop. The one difference:
				payments run in Stripe's test mode, so nothing is charged and nothing is shipped.
			</p>
			<a href="/categories" class="{linkButton} mt-8">Shop now</a>
		</div>
	</div>
</section>

<!-- how it's built -->
<section class="bg-tertiary-100 dark:bg-primary-900 defaultPadding py-20 md:py-28">
	<div class="mx-auto grid max-w-[1800px] items-center gap-10 lg:grid-cols-2 lg:gap-20">
		<div use:reveal class="order-2 lg:order-1">
			<h2 class="text-primary-950 dark:text-surface-50 text-4xl font-semibold">How it's built</h2>
			<p class="text-surface-900 dark:text-tertiary-300 mt-6 text-lg leading-relaxed">
				The pages are made with SvelteKit and drawn on the server, so they show up fast. Products,
				categories and orders are kept in a PostgreSQL database, reached through Prisma.
			</p>
			<p class="text-surface-900 dark:text-tertiary-300 mt-4 text-lg leading-relaxed">
				At checkout the server looks up every price itself, never trusting the browser. When Stripe
				confirms a payment, the order is saved exactly once. Two demo logins let you see the shop as
				a customer or as the admin.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href="/sign-in" class={linkButton}>Try a demo login</a>
				<a href="https://github.com/kiarashp/aura" class={linkButtonSecondary}>Source code</a>
			</div>
		</div>
		<img
			use:reveal={120}
			src="/about/built.webp"
			srcset={imageSet('/about/built.webp')}
			sizes="(min-width: 1024px) 45vw, 90vw"
			alt="A designer's table with fabric swatches, wood samples and pencil sketches of an armchair"
			loading="lazy"
			class="order-1 aspect-square w-full rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgb(42_37_75/0.5)] lg:order-2"
		/>
	</div>
</section>
