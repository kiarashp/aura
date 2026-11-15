<script lang="ts">
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
	import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	let { data } = $props();

	// Same idea as the Library and AMG demos: one click, no sign-up, no password.
	const logins = [
		{
			action: '?/customer',
			title: 'Try as a customer',
			text: 'Shop, pay with a test card and see your orders',
			icon: ShoppingBag
		},
		{
			action: '?/admin',
			title: 'Try as the admin',
			text: 'See every product and order (read-only)',
			icon: LayoutDashboard
		}
	];
</script>

<svelte:head>
	<title>Sign in | Aura</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section
	class="bg-surface-50 dark:bg-primary-950 defaultPadding flex grow items-center justify-center py-16"
>
	<div class="w-full max-w-[460px]">
		<h1 class="text-primary-950 dark:text-surface-100 bigHeader font-semibold">Sign in</h1>
		<p class="text-surface-900 dark:text-surface-300 mt-3">
			Aura is a demo shop, so there are no real accounts. Pick a demo login to look around.
		</p>

		{#if data.account}
			<p
				class="border-primary-200 bg-primary-50 dark:border-primary-700 dark:bg-primary-800 mt-6 rounded-sm border p-3 text-sm"
			>
				You are signed in as the demo {data.account}.
				<a class="underline" href={data.account === 'admin' ? '/admin' : '/account'}
					>Go to {data.account === 'admin' ? 'the admin page' : 'your orders'}</a
				>, or pick the other login below.
			</p>
		{/if}

		<p class="text-primary-700 dark:text-mint-300 mt-8 text-xs font-semibold uppercase tracking-widest">
			Demo · no sign-up needed
		</p>
		<div class="mt-3 grid gap-3">
			{#each logins as login (login.action)}
				<form method="POST" action={login.action}>
					<button
						class="border-tertiary-300 bg-tertiary-50/60 hover:border-primary-500 dark:border-primary-700 dark:bg-primary-950 dark:hover:border-primary-300 group flex w-full cursor-pointer items-center gap-4 rounded-sm border px-4 py-4 text-left transition hover:shadow-md"
					>
						<span
							class="bg-primary-500 dark:bg-primary-400 grid size-10 shrink-0 place-items-center rounded-sm text-white"
						>
							<login.icon size={20} />
						</span>
						<span class="min-w-0">
							<span class="text-primary-950 dark:text-surface-100 block font-medium">{login.title}</span>
							<span class="text-surface-900 dark:text-tertiary-400 block text-sm">{login.text}</span>
						</span>
						<ArrowRight
							size={18}
							class="text-surface-700 dark:text-surface-300 ms-auto shrink-0 transition-transform group-hover:translate-x-1"
						/>
					</button>
				</form>
			{/each}
		</div>
	</div>
</section>
