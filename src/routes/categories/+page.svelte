<script lang="ts">
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import ProductsGrid from '$lib/components/ProductsGrid.svelte';
	import type { Product } from '@prisma/client';
    import { X } from '@lucide/svelte';
	import { flip } from 'svelte/animate';

	const { data } = $props();

	// Filter state
	let selectedCategories = $state(new Set<string>());
	let selectedPriceRanges = $state(new Set<string>());
	let itemsToShow = $state(6);

	// Price ranges configuration
	const priceRanges = [
		{ label: 'Under €200', value: 'under-200', min: 0, max: 200 },
		{ label: '€200 - €500', value: '200-500', min: 200, max: 500 },
		{ label: '€500 - €1,000', value: '500-1000', min: 500, max: 1000 },
		{ label: 'Over €1,000', value: 'over-1000', min: 1000, max: Infinity }
	];

	// Helper function to check if product matches price range
	function matchesPriceRange(product: Product, rangeValue: string): boolean {
		const range = priceRanges.find((r) => r.value === rangeValue);
		if (!range || !product.price) return false;

		const price = typeof product.price === 'number' ? product.price : parseFloat(product.price);
		return price >= range.min && price < range.max;
	}

	// Filtered products based on active filters
	let filteredProducts = $derived.by(() => {
		if (!data.products) return [];

		return data.products.filter((product) => {
			// Category filter
			const categoryMatch =
				selectedCategories.size === 0 || selectedCategories.has(product.category?.name);

			// Price filter
			const priceMatch =
				selectedPriceRanges.size === 0 ||
				Array.from(selectedPriceRanges).some((range) => matchesPriceRange(product, range));

			return categoryMatch && priceMatch;
		});
	});

	// Products to display (with pagination)
	let displayProducts = $derived.by(() => {
		return filteredProducts.slice(0, itemsToShow);
	});

	// Check if there are more products to load
	let hasMore = $derived.by(() => {
		return filteredProducts.length > itemsToShow;
	});

	// Reset pagination when filters change
	$effect(() => {
		// This runs whenever selectedCategories or selectedPriceRanges change
		selectedCategories;
		selectedPriceRanges;
		itemsToShow = 6; // Reset to show the first 6 items
	});

	// Filter handlers
	function handleCategoryFilter(event: Event) {
		const target = event.target as HTMLInputElement;
		const categoryName = target.name;

		if (target.checked) {
			selectedCategories.add(categoryName);
		} else {
			selectedCategories.delete(categoryName);
		}

		// Trigger reactivity
		selectedCategories = new Set(selectedCategories);
	}

	function handlePriceFilter(event: Event) {
		const target = event.target as HTMLInputElement;
		const rangeValue = target.name;

		if (target.checked) {
			selectedPriceRanges.add(rangeValue);
		} else {
			selectedPriceRanges.delete(rangeValue);
		}

		// Trigger reactivity
		selectedPriceRanges = new Set(selectedPriceRanges);
	}

	function handleLoadMore() {
		itemsToShow += 6; // Load 6 more items
	}

	function clearAllFilters() {
		selectedCategories = new Set();
		selectedPriceRanges = new Set();
	}

	// Computed values for filter info
	let totalFiltersActive = $derived(selectedCategories.size + selectedPriceRanges.size);
	let resultCount = $derived(filteredProducts.length);
</script>

<svelte:head>
	<title>All products | Aura</title>
</svelte:head>

<div
	class="defaultPadding relative flex h-[209px] w-full items-end bg-cover bg-bottom pb-[36px]"
	style="background-image: url('/general/decorative-11.jpg');"
>
	<span class="bg-primary-950 absolute inset-0 z-0 opacity-30"></span>
	<h1 class="text-surface-100 bigHeader z-10">All products</h1>
</div>

<div class="bg-surface-200 dark:bg-primary-900 defaultPadding flex flex-col sm:flex-row">
	<!-- Filters Sidebar -->
	<!-- Phone: filters sit above the products. Wider screens: a side panel. -->
	<div class="w-full pt-[32px] sm:w-1/4 sm:px-2 sm:pt-[48px]">
		<div class="grid grid-cols-2 gap-x-4 pl-1 sm:sticky sm:top-[110px] sm:flex sm:max-h-[calc(100vh-80px)] sm:flex-col sm:items-start sm:overflow-y-auto sm:pb-[50px] lg:static lg:max-h-max">
			<!-- Filter Header -->
			<div class="col-span-2 mt-4 w-full flex-col items-center justify-between">
				<h3 class="smallHeader font-semibold">Filters</h3>
				{#if totalFiltersActive > 0}
					<button
						onclick={clearAllFilters}
						class="text-secondary-600 hover:text-secondary-700 text-sm underline"
					>
						Clear all ({totalFiltersActive})
					</button>
				{/if}
			</div>

			<!-- Results Counter -->
			<p class="smalltext col-span-2 mt-2">
				{resultCount} product{resultCount !== 1 ? 's' : ''} found
			</p>

			<!-- Product Categories -->
			<div class="mt-6">
				<p class="smallHeader font-semibold">Categories</p>
				<div class="mt-2 flex flex-col gap-[13px]">
					{#each data.categories as category (category.name)}
						<label
							class="hover:text-secondary-700 smalltext flex cursor-pointer select-none items-center gap-2"
						>
							<input
								type="checkbox"
								name={category.name}
								onchange={handleCategoryFilter}
								checked={selectedCategories.has(category.name)}
								class="rounded border-gray-300"
							/>
							<span class="grow">{category.name}</span>
							<!-- Optional: Show count of products in category -->
							<span class=" text-surface-900 dark:text-primary-100 pr-1">
								({data.products?.filter((p) => p.category?.name === category.name).length || 0})
							</span>
						</label>
					{/each}
				</div>
			</div>

			<!-- Price Ranges -->
			<div>
				<p class="smallHeader mt-6 font-semibold">Price Range</p>
				<div class="mt-2 flex flex-col gap-[13px]">
					{#each priceRanges as range (range.value)}
						<label
							class="hover:text-secondary-700 flex cursor-pointer select-none items-center gap-2 smalltext"
						>
							<input
								type="checkbox"
								name={range.value}
								onchange={handlePriceFilter}
								checked={selectedPriceRanges.has(range.value)}
								class="rounded border-gray-300"
							/>
							<span>{range.label}</span>
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Products Display -->
	<div class="w-full py-[24px] sm:mt-[33px] sm:w-3/4 sm:py-[36px]">
		<!-- Active Filters Display -->
		{#if totalFiltersActive > 0}
			<div class="mb-6 lg:flex flex-wrap gap-2 hidden ">
				{#each Array.from(selectedCategories) as category}
					<span
						class="bg-secondary-100 dark:bg-secondary-600 dark:text-surface-950 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm"
					
                        >
						{category}
						<button
							onclick={() => {
								selectedCategories.delete(category);
								selectedCategories = new Set(selectedCategories);
							}}
							class="text-secondary-600 hover:text-secondary-800 ml-1"
                            
						>
							<X class="w-3"/>
                            
						</button>
					</span>
				{/each}

				{#each Array.from(selectedPriceRanges) as range}
					{@const rangeLabel = priceRanges.find((r) => r.value === range)?.label}
					<span class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm">
						{rangeLabel}
						<button
							onclick={() => {
								selectedPriceRanges.delete(range);
								selectedPriceRanges = new Set(selectedPriceRanges);
							}}
							class="ml-1 text-blue-600 hover:text-blue-800"
						>
							×
						</button>
					</span>
				{/each}
			</div>
		{/if}

		<!-- Products Grid -->
		{#if displayProducts.length > 0}
			<ProductsGrid
				products={displayProducts}
				customClass="grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
				customImageClass="h-auto"
			/>
		{:else}
			<div class="py-12 text-center">
				<p class="mb-4 smallHeader ">No products found matching your filters.</p>
				<button
					onclick={clearAllFilters}
					class="text-secondary-600 hover:text-secondary-700 underline"
				>
					Clear all filters
				</button>
			</div>
		{/if}

		<!-- Load More Button -->
		<div class="mt-8 flex w-full items-center justify-center">
			{#if hasMore}
				<SimpleButton btnText="Load more" onclick={handleLoadMore} />
			{/if}
		</div>
	</div>
</div>
