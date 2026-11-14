<script lang="ts">
	import { linkButton, linkButtonSecondary } from '$lib/ui';
</script>

<svelte:head>
	<title>About us | Aura</title>
	<meta
		name="description"
		content="Aura is a demo furniture shop built with SvelteKit, Prisma, PostgreSQL and Stripe."
	/>
</svelte:head>

<h1
	class="bg-surface-300 dark:bg-primary-900 defaultPadding bigHeader flex min-h-[246px] w-full items-center justify-center py-[67px] text-center"
>
	A small shop, built in full
</h1>

<!-- the shop -->
<div class="flex flex-col-reverse lg:min-h-[603px] lg:flex-row">
	<div class="mt-[72px] flex w-full flex-col justify-between px-[25px] md:px-[80px] lg:w-1/2">
		<div class="flex flex-col lg:pr-[100px]">
			<h2 class="text-primary-950 dark:text-surface-600 bigHeader">The shop</h2>
			<p class="subheader text-surface-800 dark:text-tertiary-500 mt-[35px]">
				Aura is a made-up furniture brand with a small, calm collection: sofas and chairs, tables,
				storage and beds, in soft colours and simple shapes.
			</p>
			<p class="subheader text-surface-800 dark:text-tertiary-500 mt-[35px]">
				Every product page, filter, cart and checkout works like a real shop. The one difference:
				payments run in Stripe's test mode, so nothing is charged and nothing is shipped.
			</p>
		</div>
		<div class="my-[64px]">
			<a href="/categories" class={linkButton}>Shop now</a>
		</div>
	</div>
	<div class="flex w-full flex-col lg:w-1/2">
		<img
			src="/general/decorative-3.jpg"
			alt="Wooden shelves, a chest of drawers and a desk with a chair, in soft light"
			class="h-full w-full object-cover"
		/>
	</div>
</div>

<!-- how it's built -->
<div class="flex flex-col lg:min-h-[603px] lg:flex-row">
	<div class="flex w-full flex-col lg:w-1/2">
		<img
			src="/general/decorative-2.jpg"
			alt="A colourful room with an orange armchair, a blue sideboard and bright vases"
			class="h-full w-full object-cover"
		/>
	</div>
	<div class="mt-[72px] flex w-full flex-col justify-between px-[25px] md:px-[80px] lg:w-1/2">
		<div class="flex flex-col">
			<h2 class="text-primary-950 dark:text-surface-600 bigHeader">How it's built</h2>
			<p class="subheader text-surface-800 dark:text-tertiary-500 mt-[35px]">
				The pages are made with SvelteKit and drawn on the server, so they show up fast. Products,
				categories and orders are kept in a PostgreSQL database, reached through Prisma.
			</p>
			<p class="subheader text-surface-800 dark:text-tertiary-500 mt-[35px]">
				At checkout the server looks up every price itself, never trusting the browser. When Stripe
				confirms a payment, the order is saved exactly once. Two demo logins let you see the shop as
				a customer or as the admin.
			</p>
		</div>
		<div class="my-[64px] flex flex-wrap gap-4">
			<a href="/sign-in" class={linkButton}>Try a demo login</a>
			<a href="https://github.com/kiarashp/aura" class={linkButtonSecondary}>Source code</a>
		</div>
	</div>
</div>
