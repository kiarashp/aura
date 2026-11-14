<script lang="ts">
	import { linkButtonSecondary } from '$lib/ui';
</script>

<!-- get in touch -->
<div class="flex flex-col-reverse lg:min-h-[603px] lg:flex-row lg:pl-[80px]">
	<!-- left -->
	<div
		class="mt-[72px] flex w-full flex-col justify-between px-[25px] md:px-[80px] lg:w-1/2 lg:px-0"
	>
		<div class="flex flex-col pb-[56px] lg:pr-[100px]">
			<p class="text-primary-950 dark:text-surface-600 bigHeader">Behind Aura</p>
			<p class="subheader text-surface-800 dark:text-tertiary-500 mt-[35px]">
				Aura is a portfolio project: a complete small shop, built to show how the parts of a real
				online store fit together.
			</p>
			<p class="subheader text-surface-800 dark:text-tertiary-500 mt-[35px]">
				Products, prices and orders live in a PostgreSQL database. Payments go through Stripe, and
				Stripe tells the shop when an order is paid. The pages are built with SvelteKit.
			</p>
			<a href="/about" class="{linkButtonSecondary} mt-[35px] self-start">How it's built</a>
		</div>
	</div>
	<!-- right -->
	<div class="flex w-full flex-col lg:w-1/2">
		<img
			src="/products/Countryside-Dresser-with-6-Drawers.jpg"
			alt="A pale wooden dresser with six drawers"
			class="h-full w-full object-cover"
		/>
	</div>
</div>
