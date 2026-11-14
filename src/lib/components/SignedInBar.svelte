<script lang="ts">
	// The strip at the top of the account and admin pages: who you are, and a sign-out button.
	interface Props {
		who: string;
		note: string;
	}
	let { who, note }: Props = $props();
</script>

<div
	class="border-primary-200 bg-primary-50 dark:border-primary-700 dark:bg-primary-800 mt-8 flex flex-col gap-3 rounded-sm border p-4 sm:flex-row sm:items-center sm:justify-between"
>
	<div>
		<p class="text-primary-950 dark:text-surface-100 font-medium">Signed in as {who}</p>
		<p class="text-surface-800 dark:text-surface-300 text-sm">{note}</p>
	</div>
	<form method="POST" action="/sign-out">
		<button
			class="border-primary-500 text-primary-800 hover:bg-primary-100 dark:border-primary-300 dark:text-primary-100 dark:hover:bg-primary-700 cursor-pointer whitespace-nowrap rounded-sm border px-4 py-2 text-sm transition"
			>Sign out</button
		>
	</form>
</div>
