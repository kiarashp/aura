<script lang="ts">
	import type { Category } from '@prisma/client';
	import { page } from '$app/state';

	interface Props {
		categories: Category[];
	}
	let { categories }: Props = $props();
</script>

<footer class="bg-primary-900 dark:bg-tertiary-600 defaultPadding w-full">
	<!--top part-->
	<div class="grid grid-cols-12 gap-y-8 pt-[58px] sm:gap-x-3">
		<!--Menu col-->
		<div
			class="text-surface-200 dark:text-surface-900 col-span-12 flex flex-col items-center gap-[12px] sm:col-span-6 sm:items-start lg:col-span-3"
		>
			<p class="text-2xl">Menu</p>
			<a href="/about" class="darkHoverTxt text-xl sm:text-lg">About us</a>
			<a href="/categories" class="darkHoverTxt text-xl sm:text-lg">All products</a>
		</div>
		<!--Categories col-->
		<div
			class="text-surface-200 dark:text-surface-900 col-span-12 flex flex-col items-center gap-[12px] sm:col-span-6 sm:items-start lg:col-span-3"
		>
			<p class="text-2xl">Categories</p>
			{#each categories as category (category.id)}
				<a class="darkHoverTxt text-xl sm:text-lg" href="/categories{category.slug}"
					>{category.name}</a
				>
			{/each}
		</div>
		<!--Our company col-->
		<div
			class="text-surface-200 dark:text-surface-900 col-span-12 flex flex-col items-center gap-[12px] sm:col-span-6 sm:items-start lg:col-span-3"
		>
			<p class="text-2xl">My Account</p>
			<a href="/cart" class="darkHoverTxt text-xl sm:text-lg">My Cart</a>
			{#if page.data.account === 'admin'}
				<a href="/admin" class="darkHoverTxt text-xl sm:text-lg">Admin</a>
			{:else if page.data.account === 'customer'}
				<a href="/account" class="darkHoverTxt text-xl sm:text-lg">My orders</a>
			{:else}
				<a href="/sign-in" class="darkHoverTxt text-xl sm:text-lg">Sign in</a>
			{/if}
		</div>
		<!-- about this demo -->
		<div
			class="text-surface-200 dark:text-surface-900 col-span-12 flex flex-col items-center gap-[12px] sm:col-span-6 sm:items-start lg:col-span-3"
		>
			<p class="text-2xl">About this shop</p>
			<p class="max-w-[300px] text-center text-sm sm:text-left">
				Aura is a portfolio project: a working shop built with SvelteKit, Prisma and Stripe. Nothing is
				really sold.
			</p>
			<a href="https://kiapmd.dev" class="darkHoverTxt text-xl sm:text-lg">Made by kiapmd.dev</a>
		</div>
	</div>
	<!-- divider -->
	<div class="bg-primary-700 dark:bg-primary-100 mt-5 h-[1px]"></div>
	<!-- bottom part -->
	<div class="my-4 flex items-center justify-between">
		<p class="text-surface-200 dark:text-surface-900 text-xs md:text-base">
			© {new Date().getFullYear()} Aura, a demo shop
		</p>
		<a
			href="https://github.com/kiarashp/aura"
			class="growHover text-surface-300 dark:text-primary-800 flex h-[24px] w-[24px]"
			aria-label="Source code on GitHub"
		>
			<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path
					d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
				/>
			</svg>
		</a>
	</div>
</footer>
