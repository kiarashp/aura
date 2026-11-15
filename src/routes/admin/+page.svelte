<script lang="ts">
	import SignedInBar from '$lib/components/SignedInBar.svelte';
	import { formatDate, formatPrice } from '$lib/format';
	import { smallImage } from '$lib/images';

	let { data } = $props();

	const stats = $derived([
		{ label: 'Products', value: String(data.products.length) },
		{ label: 'Orders', value: String(data.orderCount) },
		{ label: 'Test revenue', value: formatPrice(data.revenue) }
	]);
</script>

<svelte:head>
	<title>Admin | Aura</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="bg-surface-50 dark:bg-primary-950 w-full grow px-[25px] pb-[48px] pt-[64px] md:px-[80px] lg:px-[150px]">
	<h1 class="text-primary-950 dark:text-surface-50 bigHeader font-semibold">Admin</h1>
	<SignedInBar
		who="the demo admin"
		note="Read-only: you can look at everything, but nothing here can be changed."
	/>

	<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each stats as stat (stat.label)}
			<div class="border-tertiary-300 bg-tertiary-50/60 dark:bg-primary-900/50 dark:border-primary-700 rounded-sm border p-5">
				<p class="text-surface-900 dark:text-tertiary-400 text-sm">{stat.label}</p>
				<p class="text-primary-950 dark:text-surface-100 mt-1 text-2xl font-semibold">{stat.value}</p>
			</div>
		{/each}
	</div>

	<h2 class="text-primary-800 dark:text-primary-200 mt-14 text-2xl font-medium">Latest orders</h2>
	{#if data.orders.length === 0}
		<p class="mt-4">No orders yet.</p>
	{:else}
		<div class="mt-4 overflow-x-auto">
			<table class="w-full text-left text-sm">
				<thead class="border-surface-400 dark:border-primary-600 border-b">
					<tr>
						<th class="py-2 pe-4 font-medium">Order</th>
						<th class="py-2 pe-4 font-medium">Date</th>
						<th class="py-2 pe-4 font-medium">Buyer</th>
						<th class="hidden py-2 pe-4 font-medium sm:table-cell">Items</th>
						<th class="py-2 text-right font-medium">Total</th>
					</tr>
				</thead>
				<tbody>
					{#each data.orders as order (order.id)}
						<tr class="border-surface-200 dark:border-primary-800 border-b">
							<td class="py-2 pe-4">#{order.id}</td>
							<td class="whitespace-nowrap py-2 pe-4">{formatDate(order.createdAt)}</td>
							<td class="py-2 pe-4">{order.account === 'customer' ? 'Demo customer' : 'Guest'}</td>
							<td class="hidden py-2 pe-4 sm:table-cell">{order.items.reduce((n, i) => n + i.quantity, 0)}</td>
							<td class="py-2 text-right">{formatPrice(order.total)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	<h2 class="text-primary-800 dark:text-primary-200 mt-14 text-2xl font-medium">Products</h2>
	<div class="mt-4 overflow-x-auto">
		<table class="w-full text-left text-sm">
			<thead class="border-surface-400 dark:border-primary-600 border-b">
				<tr>
					<th class="py-2 pe-4 font-medium">Product</th>
					<th class="hidden py-2 pe-4 font-medium sm:table-cell">Category</th>
					<th class="hidden py-2 pe-4 font-medium sm:table-cell">Featured</th>
					<th class="py-2 text-right font-medium">Price</th>
				</tr>
			</thead>
			<tbody>
				{#each data.products as product (product.id)}
					<tr class="border-surface-200 dark:border-primary-800 border-b">
						<td class="py-2 pe-4">
							<a href="/products/{product.id}" class="flex items-center gap-3 hover:underline">
								<img src={smallImage(product.imageUrl)} alt="" class="size-10 shrink-0 rounded-md object-cover" loading="lazy" />
								{product.name}
							</a>
						</td>
						<td class="hidden py-2 pe-4 sm:table-cell">{product.category.name}</td>
						<td class="hidden py-2 pe-4 sm:table-cell">{product.featured ? 'Yes' : '—'}</td>
						<td class="py-2 text-right">{formatPrice(product.price)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
