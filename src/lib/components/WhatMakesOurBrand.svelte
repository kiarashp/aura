<script lang="ts">
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import ReceiptText from '@lucide/svelte/icons/receipt-text';
	import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
	import SlidersHorizontal from '@lucide/svelte/icons/sliders-horizontal';
	import { reveal } from '$lib/actions/reveal';

	// The four things a visitor can try. Every line here is true of this demo.
	const features = [
		{
			icon: CreditCard,
			title: 'Real checkout',
			text: "Pay on Stripe's own checkout page, in test mode. Use the card 4242 4242 4242 4242."
		},
		{
			icon: ReceiptText,
			title: 'Order history',
			text: 'Sign in as the demo customer, and every order you pay for shows up under My orders.'
		},
		{
			icon: LayoutDashboard,
			title: 'Admin view',
			text: "Sign in as the admin to see all products and orders. It's read-only, so look around freely."
		},
		{
			icon: SlidersHorizontal,
			title: 'Quick filters',
			text: 'Narrow the collection by room and price. Your cart is kept even if you close the tab.'
		}
	];
</script>

<section id="try" class="bg-surface-50 dark:bg-primary-950 defaultPadding scroll-mt-24 py-20 md:py-28">
	<div class="mx-auto max-w-[1800px]">
		<div use:reveal class="max-w-2xl">
			<p class="text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-[0.18em]">
				Made to be tried
			</p>
			<h2 class="text-primary-950 dark:text-surface-50 mt-3 text-4xl font-semibold md:text-5xl">
				Try the whole shop
			</h2>
		</div>
		<div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each features as feature, i (feature.title)}
				<div
					use:reveal={i * 110}
					class="border-tertiary-300 bg-tertiary-50 hover:border-mint-400 dark:border-primary-800 dark:bg-primary-900/60 dark:hover:border-mint-500 group rounded-2xl border p-6 transition-colors"
				>
					<span
						class="bg-mint-100 text-mint-700 dark:bg-mint-900/60 dark:text-mint-300 grid size-12 place-items-center rounded-full transition-transform duration-500 group-hover:scale-110"
					>
						<feature.icon size={22} aria-hidden="true" />
					</span>
					<h3 class="text-primary-950 dark:text-surface-50 mt-5 text-xl font-semibold">{feature.title}</h3>
					<p class="text-surface-900 dark:text-tertiary-400 mt-2 leading-relaxed">{feature.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
