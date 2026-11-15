<script lang="ts">
	import type { Category } from '@prisma/client';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
	import UserRound from '@lucide/svelte/icons/user-round';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import Logo from './brand/Logo.svelte';
	import ToggleDarkMode from './ToggleDarkMode.svelte';
	import { getCart } from './CartProducts.svelte';

	interface Props {
		allCategories: Category[];
	}
	const { allCategories }: Props = $props();
	const cart = getCart();

	// Main menu: every category, then "All" and "About".
	const links = $derived([
		...allCategories.map((c) => ({ href: `/categories${c.slug}`, label: c.name })),
		{ href: '/categories', label: 'All products' },
		{ href: '/about', label: 'About' }
	]);
	const isActive = (href: string) => page.url.pathname === href;

	// Signed out: "Sign in". Signed in with a demo login: a link to its own page.
	const accountLink = $derived(
		page.data.account === 'admin'
			? { href: '/admin', label: 'Admin' }
			: page.data.account === 'customer'
				? { href: '/account', label: 'My orders' }
				: { href: '/sign-in', label: 'Sign in' }
	);

	// The cart count gives a little bounce whenever something is added (not when the saved cart loads).
	let bump = $state(false);
	let lastCount: number | null = null;
	$effect(() => {
		const n = cart.itemCount;
		if (!cart.loaded) return;
		if (lastCount !== null && n > lastCount) {
			bump = false;
			requestAnimationFrame(() => (bump = true));
		}
		lastCount = n;
	});

	// Once the page is scrolled, the header gets a soft shadow and see-through blur.
	let scrollY = $state(0);
	const scrolled = $derived(scrollY > 8);

	// Phone menu: closes on any page change and with the Escape key.
	let menuOpen = $state(false);
	afterNavigate(() => (menuOpen = false));
	// While it is open, the page behind it doesn't scroll.
	$effect(() => {
		document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
	});
</script>

<svelte:window bind:scrollY onkeydown={(e) => e.key === 'Escape' && (menuOpen = false)} />

<header
	class="sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300
	{scrolled
		? 'bg-surface-50/80 dark:bg-primary-950/80 border-tertiary-300/60 dark:border-primary-800 shadow-[0_8px_30px_-12px_rgb(42_37_75/0.25)] backdrop-blur-lg'
		: 'bg-surface-50 dark:bg-primary-950 border-transparent'}"
>
	<div class="defaultPadding mx-auto flex h-16 max-w-[1800px] items-center gap-4 md:h-[72px]">
		<a href="/" class="text-primary-950 dark:text-surface-50 shrink-0" aria-label="Aura, home">
			<Logo size="sm" />
		</a>

		<!-- Desktop menu -->
		<nav aria-label="Main" class="mx-auto hidden items-center gap-1 lg:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={isActive(link.href) ? 'page' : undefined}
					class="relative rounded-full px-4 py-2 text-[15px] transition-colors
					{isActive(link.href)
						? 'text-primary-950 dark:text-surface-50 bg-tertiary-200/70 dark:bg-primary-800'
						: 'text-surface-900 dark:text-tertiary-400 hover:text-primary-950 dark:hover:text-surface-50 hover:bg-tertiary-100 dark:hover:bg-primary-900'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Cart, account, dark mode, phone menu button -->
		<div class="ms-auto flex items-center gap-1 lg:ms-0">
			<a
				href="/cart"
				class="text-primary-950 dark:text-surface-100 hover:bg-tertiary-100 dark:hover:bg-primary-900 relative grid size-10 place-items-center rounded-full transition-colors"
				aria-label={cart.itemCount ? `Cart, ${cart.itemCount} items` : 'Cart'}
			>
				<ShoppingBag size={21} aria-hidden="true" />
				{#if cart.itemCount > 0}
					<span
						class="bg-mint-400 text-primary-950 absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full px-1 text-[11px] font-semibold leading-5 {bump ? 'animate-bump' : ''}"
						onanimationend={() => (bump = false)}
						aria-hidden="true">{cart.itemCount}</span
					>
				{/if}
			</a>
			<a
				href={accountLink.href}
				class="text-primary-950 dark:text-surface-100 hover:bg-tertiary-100 dark:hover:bg-primary-900 hidden h-10 items-center gap-2 rounded-full px-3 text-[15px] transition-colors sm:flex"
			>
				<UserRound size={20} aria-hidden="true" />
				{accountLink.label}
			</a>
			<ToggleDarkMode />
			<button
				type="button"
				class="text-primary-950 dark:text-surface-100 hover:bg-tertiary-100 dark:hover:bg-primary-900 grid size-10 cursor-pointer place-items-center rounded-full lg:hidden"
				aria-label="Open menu"
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = true)}
			>
				<Menu size={22} aria-hidden="true" />
			</button>
		</div>
	</div>
</header>

<!-- Phone and tablet menu: slides in from the right -->
{#if menuOpen}
	<div class="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
		<button
			type="button"
			class="bg-primary-950/50 absolute inset-0 cursor-default backdrop-blur-sm"
			aria-label="Close menu"
			tabindex="-1"
			onclick={() => (menuOpen = false)}
			transition:fade={{ duration: 200 }}
		></button>
		<div
			class="bg-surface-50 dark:bg-primary-950 absolute inset-y-0 right-0 flex w-[min(340px,88vw)] flex-col overflow-y-auto shadow-2xl"
			transition:fly={{ x: 340, duration: 300, opacity: 1 }}
		>
			<div class="flex h-16 items-center justify-between px-6">
				<span class="text-primary-950 dark:text-surface-50"><Logo size="sm" /></span>
				<button
					type="button"
					class="text-primary-950 dark:text-surface-100 hover:bg-tertiary-100 dark:hover:bg-primary-900 grid size-10 cursor-pointer place-items-center rounded-full"
					aria-label="Close menu"
					onclick={() => (menuOpen = false)}
				>
					<X size={22} aria-hidden="true" />
				</button>
			</div>
			<nav aria-label="Menu" class="flex flex-col px-3 py-4">
				{#each links as link, i (link.href)}
					<a
						href={link.href}
						aria-current={isActive(link.href) ? 'page' : undefined}
						class="font-brand rounded-xl px-3 py-3 text-2xl transition-colors
						{isActive(link.href)
							? 'bg-tertiary-200/70 dark:bg-primary-800 text-primary-950 dark:text-surface-50'
							: 'text-primary-900 dark:text-tertiary-300 hover:bg-tertiary-100 dark:hover:bg-primary-900'}"
						in:fly={{ x: 24, delay: 80 + i * 40, duration: 300 }}
					>
						{link.label}
					</a>
				{/each}
			</nav>
			<div class="border-tertiary-300 dark:border-primary-800 mt-auto flex flex-col gap-1 border-t px-3 py-4">
				<a
					href={accountLink.href}
					class="text-primary-950 dark:text-surface-100 hover:bg-tertiary-100 dark:hover:bg-primary-900 flex items-center gap-3 rounded-xl px-3 py-3"
				>
					<UserRound size={20} aria-hidden="true" />
					{accountLink.label}
				</a>
				<a
					href="/cart"
					class="text-primary-950 dark:text-surface-100 hover:bg-tertiary-100 dark:hover:bg-primary-900 flex items-center gap-3 rounded-xl px-3 py-3"
				>
					<ShoppingBag size={20} aria-hidden="true" />
					Cart{cart.itemCount ? ` (${cart.itemCount})` : ''}
				</a>
			</div>
		</div>
	</div>
{/if}
