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
	let itemsToShow = $state(3);

	// Price ranges configuration
	const priceRanges = [
		{ label: 'Under €50', value: 'under-50', min: 0, max: 50 },
		{ label: '€50 - €100', value: '50-100', min: 50, max: 100 },
		{ label: '€100 - €200', value: '100-200', min: 100, max: 200 },
		{ label: 'Over €200', value: 'over-200', min: 200, max: Infinity }
	];

	// Helper function to check if product matches price range
	function matchesPriceRange(product: Product, rangeValue: string): boolean {
		const range = priceRanges.find((r) => r.value === rangeValue);
		if (!range || !product.price) return false;

		const price = typeof product.price === 'number' ? product.price : parseFloat(product.price);
		return price >= range.min && price <= range.max;
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
	$inspect('displayProducts', displayProducts);
	$inspect('filteredProducts', filteredProducts);
	$inspect('selectedCategories', selectedCategories);
	$inspect('selectedPriceRanges', selectedPriceRanges);

	// Check if there are more products to load
	let hasMore = $derived.by(() => {
		return filteredProducts.length > itemsToShow;
	});

	// Reset pagination when filters change
	$effect(() => {
		// This runs whenever selectedCategories or selectedPriceRanges change
		selectedCategories;
		selectedPriceRanges;
		itemsToShow = 3; // Reset to show first 3 items
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

<div
	class="defaultPadding relative flex h-[209px] w-full items-end bg-cover bg-bottom pb-[36px]"
	style="background-image: url('/general/decorative-11.jpg');"
>
	<span class="bg-primary-950 absolute inset-0 z-0 opacity-30"></span>
	<p class="text-surface-100 bigHeader z-10">All products</p>
</div>

<div class="bg-surface-200 dark:bg-primary-900 defaultPadding flex flex-row">
	<!-- Filters Sidebar -->
	<div class="w-2/4 pr-2 pt-[48px] sm:w-1/4 sm:px-2">
		<div class="flex flex-col items-start sticky lg:static pb-[50px] top-[110px] max-h-[calc(100vh-80px)] lg:max-h-max overflow-y-scroll lg:overflow-y-auto pl-1 ">
			<!-- Filter Header -->
			<div class="mt-4 flex-col w-full items-center justify-between">
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
			<p class="smalltext mt-2">
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
	<div class="mt-[33px] w-2/4 py-[36px] sm:w-3/4">
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
