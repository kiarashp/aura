<script lang="ts">
	import type { Category } from '@prisma/client';
	import { page } from '$app/state';
	import Logo from './brand/Logo.svelte';

	interface Props {
		categories: Category[];
	}
	let { categories }: Props = $props();

	const accountLink = $derived(
		page.data.account === 'admin'
			? { href: '/admin', label: 'Admin' }
			: page.data.account === 'customer'
				? { href: '/account', label: 'My orders' }
				: { href: '/sign-in', label: 'Sign in' }
	);

	const linkClass = 'text-tertiary-400 hover:text-surface-50 transition-colors';
	const headClass = 'text-mint-300 text-xs font-semibold uppercase tracking-[0.18em]';
</script>

<!-- Dark purple in both light and dark mode, so the page always ends on the brand colour. -->
<footer class="bg-primary-950 relative isolate mt-auto overflow-hidden dark:bg-[#17142b]">
	<div class="aura-glow absolute -right-40 -top-48 -z-10 size-[520px]" aria-hidden="true"></div>

	<div class="defaultPadding mx-auto grid max-w-[1800px] gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
		<div class="text-surface-50 max-w-sm">
			<a href="/" aria-label="Aura, home"><Logo size="lg" /></a>
			<p class="font-brand text-tertiary-300 mt-5 text-xl">Quiet furniture for everyday rooms.</p>
			<p class="text-tertiary-500 mt-3 text-sm leading-relaxed">
				A portfolio demo: a working shop built with SvelteKit, Prisma and Stripe. Nothing is really
				sold.
			</p>
		</div>

		<nav aria-label="Shop" class="flex flex-col gap-3">
			<p class={headClass}>Shop</p>
			{#each categories as category (category.slug)}
				<a href="/categories{category.slug}" class={linkClass}>{category.name}</a>
			{/each}
			<a href="/categories" class={linkClass}>All products</a>
		</nav>

		<nav aria-label="Your account" class="flex flex-col gap-3">
			<p class={headClass}>Your account</p>
			<a href="/cart" class={linkClass}>Cart</a>
			<a href={accountLink.href} class={linkClass}>{accountLink.label}</a>
		</nav>

		<nav aria-label="About" class="flex flex-col gap-3">
			<p class={headClass}>About</p>
			<a href="/about" class={linkClass}>About Aura</a>
			<a href="https://github.com/kiarashp/aura" class={linkClass}>Source code on GitHub</a>
			<a href="https://kiapmd.dev/" class={linkClass}>Made by kiapmd.dev</a>
		</nav>
	</div>

	<div class="border-t border-white/10">
		<div
			class="defaultPadding text-tertiary-600 mx-auto flex max-w-[1800px] flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between"
		>
			<p>© 2026 Aura, a demo shop</p>
			<p>Pay with the test card 4242 4242 4242 4242</p>
		</div>
	</div>
</footer>
