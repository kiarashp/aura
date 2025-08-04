<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	interface props {
		openState?: boolean;
		confirmPressed?: boolean;
	}

	let { openState = $bindable(false), confirmPressed = $bindable(false) }: props = $props();

	function modalClose() {
		openState = false;
	}
	function modalConfirm() {
		openState = false;
		confirmPressed = true;
	}
</script>

<Modal
	open={openState}
	onOpenChange={(e) => (openState = e.open)}
	triggerBase="btn preset-tonal"
	contentBase="card bg-surface-400 dark:bg-primary-900 p-4 space-y-4 shadow-xl max-w-screen-sm"
	backdropClasses="backdrop-blur-sm"
>
	<!-- {#snippet trigger()}Open Modal{/snippet} -->
	{#snippet content()}
		<header class="flex justify-between">
			<h2 class="subheader">Delete Account Permanently?</h2>
		</header>
		<article>
			<p class="smalltext">
				Are you sure you want to delete your account? This action cannot be undone. All of your
				saved information will be permanently removed. You will not be able to log in with this
				account again.
			</p>
		</article>
		<footer class="flex justify-end gap-4">
			<button type="button" class="btn preset-tonal" onclick={modalClose}>Cancel</button>
			<button type="button" class="btn preset-filled" onclick={modalConfirm}>Confirm</button>
		</footer>
	{/snippet}
</Modal>
