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

<div class="card border-surface-100-900 grid min-h-[500px] w-full grid-cols-[auto_1fr] border-[1px]">
	<!-- Component -->
	<Navigation.Rail {value} onValueChange={(newValue) => (value = newValue)}>
		{#snippet tiles()}
			<Navigation.Tile id="profile" label="Profile"><User /></Navigation.Tile>
			<Navigation.Tile id="history" label="Order History"><History /></Navigation.Tile>
			<Navigation.Tile id="settings" label="Settings"><Settings /></Navigation.Tile>
		{/snippet}
	</Navigation.Rail>
	<!-- Content -->
	<div class="bg-surface-400 dark:bg-primary-900 flex flex-col items-center justify-center py-9 px-[28px]">
		{#if value === 'profile'}
			<ProfileForm />
		{:else if value === 'history'}
			<HistoryOrder />
		{:else if value === 'settings'}
			<SettingAccount />
		{/if}
	</div>
</div>
