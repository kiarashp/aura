<script lang="ts">
	import SimpleButton from './SimpleButton.svelte';

	let formSubmited = $state(false);
	function submitForm(e: Event) {
		e.preventDefault();
		formSubmited = true
	}
</script>

<div class="bg-surface-50 dark:bg-primary-950 w-full !max-w-xl rounded-2xl p-6 shadow-lg md:p-6">
	{#if formSubmited}
		<p class="subheader text-primary-900 dark:text-primary-300">
			Profile changes have been submitted for review. You'll be notified when your updates are live.
		</p>
	{:else}
		<h1 class="text-primary-900 dark:text-primary-50 header mb-4 font-semibold">
			Edit your profile
		</h1>
		<form onsubmit={submitForm}>
			<!-- Name -->
			<div class="mb-4">
				<label
					for="cardholder-name"
					class="text-primary-900 dark:text-primary-50 block text-sm font-medium">Name</label
				>
				<input
					type="text"
					id="name"
					name="name"
					placeholder="John Doe"
					class="border-surface-600 focus:border-primary-300 focus:ring-primary-400 bg-surface-50 dark:bg-primary-800 text-surface-950
               dark:text-surface-50 mt-1 block w-full rounded-lg p-2 shadow-sm
               
               "
					value="Jane Doe"
					required
				/>
			</div>
			<!-- Email -->
			<div class="mb-4">
				<label
					for="cardholder-name"
					class="text-primary-900 dark:text-primary-50 block text-sm font-medium">Email</label
				>
				<input
					type="email"
					id="mail"
					name="mail"
					placeholder="John.Doe@domain.com"
					class="border-surface-600 focus:border-primary-300 focus:ring-primary-400 bg-surface-50
               dark:bg-primary-800 text-surface-950 dark:text-surface-50 mt-1 block
               w-full rounded-lg p-2 shadow-sm
               "
					value="Jane.Doe@domain.com"
					required
				/>
			</div>

			<!-- Age & country -->
			<div class="flex gap-4">
				<!-- Expiry Date -->
				<div class="mb-4 w-1/2">
					<label for="age" class="text-primary-900 dark:text-primary-50 block text-sm font-medium"
						>Age</label
					>
					<input
						type="number"
						id="age"
						name="age"
						placeholder="35"
						class="border-surface-600 focus:border-primary-300 focus:ring-primary-400 bg-surface-50
               dark:bg-primary-800 text-surface-950 dark:text-surface-50 mt-1 block
               w-full rounded-lg p-2 shadow-sm"
						required
						maxlength="3"
						value="40"
					/>
				</div>

				<!-- Gender -->
				<div class="mb-4 w-1/2">
					<label
						for="gender"
						class="text-primary-900 dark:text-primary-50 block text-sm font-medium">gender</label
					>
					<select
						name="gender"
						id="gender"
						class="border-surface-600 focus:border-primary-300 focus:ring-primary-400 bg-surface-50
               dark:bg-primary-800 text-surface-950 dark:text-surface-50 mt-1 block
               w-full rounded-lg p-2 shadow-sm"
					>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
				</div>
			</div>

			<!-- Submit Button -->
			<SimpleButton btnWidth="w-full" btnHeight="h-[40px]" variant="primary" btnText="Submit" />
			<div></div>
		</form>
	{/if}
</div>
