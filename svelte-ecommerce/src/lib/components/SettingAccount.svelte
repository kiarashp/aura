<script lang="ts">
	import SimpleButton from './SimpleButton.svelte';
</script>

<div class="bg-surface-50 dark:bg-primary-950 w-full max-w-md rounded-2xl p-6 shadow-lg">
	<h1 class="text-primary-900 dark:text-primary-50 mb-4 text-2xl font-semibold">
		Account Settings
	</h1>
	<form action="#" method="POST">
		<!-- passowrd -->
		<div class="mb-4">
			<label for="password" class="text-primary-900 dark:text-primary-50 block text-sm font-medium"
				>Password</label
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
			<label for="password" class="text-primary-900 dark:text-primary-50 block text-sm font-medium"
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

        
		<!-- Submit Button -->
		<SimpleButton customClasses="mt-2" btnWidth="w-full" btnHeight="h-[40px]" variant="error" btnText="Delete my account" />
		<div></div>
	</form>
</div>
