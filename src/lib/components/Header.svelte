<script lang="ts">
	import { onMount } from 'svelte';
	import type { Category } from '@prisma/client';

	import CartButton from '$lib/components/CartButton.svelte';
	import { page } from '$app/state';
	import ToggleDarkMode from './ToggleDarkMode.svelte';
	import UserRound from '@lucide/svelte/icons/user-round';
	interface props {
		allCategories: Category[];
	}
	let isMobileMenuOpen = $state(false);
	const { allCategories }: props = $props();

	// Signed out: "Sign in". Signed in with a demo login: a link to its own page.
	const accountLink = $derived(
		page.data.account === 'admin'
			? { href: '/admin', label: 'Admin' }
			: page.data.account === 'customer'
				? { href: '/account', label: 'My orders' }
				: { href: '/sign-in', label: 'Sign in' }
	);

	// handling scrolling
	let isScrolled = $state(false);
	let sentinel: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				isScrolled = !entry.isIntersecting;
			},
			{
				rootMargin: '-1px 0px 0px 0px' // Triggers when element is 1px out of view
			}
		);

		if (sentinel) {
			observer.observe(sentinel);
		}

		return () => observer.disconnect();
	});
</script>

<div class="h-[1px] w-full bg-transparent" bind:this={sentinel}></div>
<div class="sticky top-0 z-50 w-full" data-sticky>
	<div
		class="bg-surface-100 dark:bg-surface-950 sticky top-0 z-50 w-full transition-all duration-200 {isScrolled
			? ' border-surface-200/50 dark:border-surface-800/50 border-b shadow-md'
			: ''} defaultPadding flex-col"
	>
		<div class="bg-surface-100 dark:bg-surface-950 w-full flex-col">
			<!-- Mobile nav -->
			{#if isMobileMenuOpen}
				<nav
					class="bg-surface-100 dark:bg-surface-950 border-surface-200 dark:border-surface-800 absolute left-0 top-full w-full border-t py-4 md:hidden"
				>
					<div class="flex flex-col gap-4 px-[28px]">
						{#each allCategories as category (category.slug)}
							<a
								href="/categories{category.slug}"
								onclick={() => (isMobileMenuOpen = false)}
								class="py-2 text-lg"
							>
								{category.name}
							</a>
						{/each}
						<a href="/about" onclick={() => (isMobileMenuOpen = false)} class="py-2 text-lg"
							>About us</a
						>
						<a href={accountLink.href} onclick={() => (isMobileMenuOpen = false)} class="py-2 text-lg"
							>{accountLink.label}</a
						>
						<a href="/cart" onclick={() => (isMobileMenuOpen = false)} class="py-2 text-lg"
							>My cart</a
						>
					</div>
				</nav>
			{/if}

			<!-- top bar -->
			<div class=" grid h-[70px] w-full grid-cols-12">
				<!-- logo -->

				<a
					href="/"
					class="growHover text-primary-900 dark:text-surface-50
					col-span-6 col-start-1 row-start-1 self-center
					  justify-self-start text-3xl font-medium md:col-end-13 md:justify-self-center md:text-center"
					>Aura</a
				>

				<!--cart and account -->
				<div
					class="col-span-6 col-start-7 row-start-1 flex flex-row gap-3 self-center justify-self-end pe-2
					md:col-start-9 md:col-end-13"
				>
					<!-- Mobile menu button -->
					<button
						aria-label="mobile menu"
						class="flex flex-col gap-1 p-2 md:hidden"
						onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					>
						<span
							class="h-0.5 w-5 bg-current transition-transform {isMobileMenuOpen
								? 'translate-y-1.5 rotate-45'
								: ''}"
						></span>
						<span
							class="h-0.5 w-5 bg-current transition-opacity {isMobileMenuOpen ? 'opacity-0' : ''}"
						></span>
						<span
							class="h-0.5 w-5 bg-current transition-transform {isMobileMenuOpen
								? '-translate-y-1.5 -rotate-45'
								: ''}"
						></span>
					</button>
					<a href="/cart" class="hidden md:block" aria-label="Cart">
						<CartButton />
					</a>
					<!-- account: "Sign in", or where the demo login goes -->
					<a
						href={accountLink.href}
						class="growHover text-primary-950 dark:text-surface-200 hidden items-center gap-1.5 text-sm md:flex"
					>
						<UserRound size={20} />
						{accountLink.label}
					</a>
					<!-- toggle dark -->

					<ToggleDarkMode />
				</div>
			</div>
			<!--divider-->
			<div class="bg-primary-50 dark:bg-primary-contrast-50 h-[2px] w-full"></div>
			<!--bottom bar-->
			<nav class=" hidden h-[62px] w-full items-center justify-center gap-[44px] md:flex">
				{#each allCategories as category (category.slug)}
					<a
						class="hover:text-surface-950 dark:hover:text-primary-500 dark:text-surface-contrast-800 duration-200
				{'/categories' + category.slug === page.url.pathname ? 'text-primary-900' : 'text-surface-800'}"
						href="/categories{category.slug}">{category.name}</a
					>
				{/each}
				<a
					class="hover:text-surface-950 dark:hover:text-primary-500 text-surface-800 dark:text-surface-contrast-800 duration-200"
					href="/about">About us</a
				>
			</nav>
		</div>
	</div>
</div>
