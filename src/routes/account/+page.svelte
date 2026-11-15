<script lang="ts">
	import SignedInBar from '$lib/components/SignedInBar.svelte';
	import { formatDate, formatPrice } from '$lib/format';
	import { linkButton } from '$lib/ui';

	let { data } = $props();
</script>

<svelte:head>
	<title>My orders | Aura</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="bg-surface-50 dark:bg-primary-950 w-full grow px-[25px] pb-[48px] pt-[64px] md:px-[80px] lg:px-[150px]">
	<h1 class="text-primary-950 dark:text-surface-50 bigHeader font-semibold">My orders</h1>
	<SignedInBar
		who="the demo customer"
		note="Everyone who clicks “Try as a customer” shares this login, so you may see their test orders too."
	/>

	{#if data.orders.length === 0}
		<div class="mt-12 flex flex-col items-start gap-6">
			<p class="subheader">No orders yet. Buy something with the test card and it shows up here.</p>
			<a href="/categories" class={linkButton}>Browse products</a>
		</div>
	{:else}
		<ul class="mt-12 flex flex-col gap-6">
			{#each data.orders as order (order.id)}
				<li class="border-tertiary-300 bg-tertiary-50/60 dark:border-primary-700 rounded-sm border p-5">
					<div class="flex flex-wrap items-baseline justify-between gap-2">
						<p class="text-primary-950 dark:text-surface-100 font-medium">
							Order #{order.id} · {formatDate(order.createdAt)}
						</p>
						<p class="text-primary-950 dark:text-surface-100 font-semibold">{formatPrice(order.total)}</p>
					</div>
					<p class="text-surface-800 dark:text-surface-300 text-sm">Paid with a test card · not shipped (demo)</p>
					<ul class="border-surface-200 dark:border-primary-800 mt-4 border-t pt-3 text-sm">
						{#each order.items as item (item.id)}
							<li class="flex justify-between gap-4 py-1">
								<span>
									{#if item.productId}
										<a class="hover:underline" href="/products/{item.productId}">{item.name}</a>
									{:else}
										{item.name}
									{/if}
									<span class="text-surface-700 dark:text-surface-400">× {item.quantity}</span>
								</span>
								<span>{formatPrice(item.price * item.quantity)}</span>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{/if}
</div>
