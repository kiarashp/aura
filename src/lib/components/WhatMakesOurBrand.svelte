<script lang="ts">
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import ReceiptText from '@lucide/svelte/icons/receipt-text';
	import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
	import SlidersHorizontal from '@lucide/svelte/icons/sliders-horizontal';

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

<!-- what you can try -->
<div
	class="text-surface-950 dark:text-surface-200 bg-surface-50 dark:bg-primary-900 defaultPadding flex min-h-[355px] flex-col md:pt-[60px]"
>
	<h2 class="header w-full lg:text-center">Try the whole shop</h2>
	<div class="mt-[51px] grid grid-cols-4 gap-x-[8px] gap-y-6 md:gap-x-[20px]">
		{#each features as feature (feature.title)}
			<div class="col-span-4 flex flex-col sm:col-span-2 md:col-span-1">
				<feature.icon size={24} aria-hidden="true" />
				<h3 class="mt-[16px] text-2xl">{feature.title}</h3>
				<p class="mt-[8px] text-base">{feature.text}</p>
			</div>
		{/each}
	</div>
</div>
