<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	// Icons
	import { User } from '@lucide/svelte';
	import History from '@lucide/svelte/icons/history';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	import HistoryOrder from '$lib/components/HistoryOrder.svelte';
	import Settings from '@lucide/svelte/icons/settings';
	import SettingAccount from '$lib/components/SettingAccount.svelte';

	// State
	let value = $state('profile');
</script>

<div class="card border-surface-100-900 defaultPadding grid min-h-[500px] w-full grid-cols-12">
	<!-- desktop menu -->
	<div
		class=" bg-surface-400 dark:bg-primary-900 col-span-2 hidden px-2 md:flex md:px-4 items-center justify-center"
	>
		<Navigation.Rail
			{value}
			onValueChange={(newValue) => (value = newValue)}
			classes="bg-surface-400 dark:bg-primary-900 max-w-[100px]"
		>
			{#snippet tiles()}
				<Navigation.Tile id="profile" label="Profile"><User /></Navigation.Tile>
				<Navigation.Tile id="history" label="Order History"><History /></Navigation.Tile>
				<Navigation.Tile id="settings" label="Settings"><Settings /></Navigation.Tile>
			{/snippet}
		</Navigation.Rail>
	</div>
	<!-- Content -->
	<div
		class=" bg-surface-400 dark:bg-primary-900 col-span-12 flex grow flex-col items-center justify-center px-2 py-9 md:col-span-10 md:px-4"
	>
		{#if value === 'profile'}
			<ProfileForm />
		{:else if value === 'history'}
			<HistoryOrder />
		{:else if value === 'settings'}
			<SettingAccount />
		{/if}
	</div>
	<!-- mobile menu -->
	<Navigation.Bar
		{value}
		onValueChange={(newValue) => (value = newValue)}
		classes="bg-surface-400 dark:bg-primary-900 md:hidden flex px-2 md:px-4 col-span-12 my-2 !min-w-0"
	>
		<Navigation.Tile id="profile" label="Profile"><User /></Navigation.Tile>
		<Navigation.Tile id="history" label="Order History"><History /></Navigation.Tile>
		<Navigation.Tile id="settings" label="Settings"><Settings /></Navigation.Tile>
	</Navigation.Bar>
</div>
