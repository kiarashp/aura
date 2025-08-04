<script lang="ts">
	import SimpleButton from './SimpleButton.svelte';
	import DeleteModal from './DeleteModal.svelte';
	let formSubmited = $state(false);
	let modalState = $state(false);

	let accountDelete = $state(false);
	function submitForm(e: Event) {
		e.preventDefault();
		formSubmited = true;
	}
</script>

<div class="bg-surface-50 dark:bg-primary-950 w-full max-w-md rounded-2xl p-6 shadow-lg">
		<DeleteModal bind:openState={modalState} bind:confirmPressed={accountDelete} />

	
	{#if formSubmited}
		<p class="subheader text-primary-900 dark:text-primary-300">
			Your password change request was successful. For security reasons, changes will not be applied
			at this time. Please contact customer support if you need to reset your password
		</p>
	{:else if accountDelete}
		<p class="subheader text-primary-900 dark:text-primary-300">
			Your account deletion request has been received. After a brief review, we will permanently
			delete your account and notify you once the process is complete. We appreciate your patience.
		</p>
	{:else}
		<h1 class="text-primary-900 dark:text-primary-50 mb-4 text-2xl font-semibold">
			Account Settings
		</h1>
		<form onsubmit={submitForm}>
			<!-- passowrd -->
			<div class="mb-4">
				<label
					for="password"
					class="text-primary-900 dark:text-primary-50 block text-sm font-medium">Password</label
				>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="************"
					class="border-surface-600 focus:border-primary-300 focus:ring-primary-400 bg-surface-50 dark:bg-primary-800 text-surface-950
               dark:text-surface-50 mt-1 block w-full rounded-lg p-2 shadow-sm
               
               "
					value="**********"
					required
				/>
			</div>
			<!-- confirm passowrd -->
			<div class="mb-4">
				<label
					for="password"
					class="text-primary-900 dark:text-primary-50 block text-sm font-medium"
					>Confirm password</label
				>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					placeholder="************"
					class="border-surface-600 focus:border-primary-300 focus:ring-primary-400 bg-surface-50 dark:bg-primary-800 text-surface-950
               dark:text-surface-50 mt-1 block w-full rounded-lg p-2 shadow-sm
               
               "
					value="**********"
					required
				/>
			</div>

			<!-- Submit Button -->
			<SimpleButton btnWidth="w-full" btnHeight="h-[40px]" variant="primary" btnText="Submit" />

			<!-- Delete Button -->
			<SimpleButton
				customClasses="mt-2"
				btnWidth="w-full"
				btnHeight="h-[40px]"
				variant="error"
				btnText="Delete my account"
				type="button"
				onclick={() => {
					modalState = true;
				}}
			/>
			<div></div>
		</form>
	{/if}
</div>
