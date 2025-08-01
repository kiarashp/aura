<script lang="ts">
	import SimpleButton from './SimpleButton.svelte';

	interface props {
		version: number;
	}
	let { version }: props = $props();
</script>

{#if version === 1}
	<!-- version 1 footer -->
	<div class="grid w-full grid-cols-10 gap-y-6 md:gap-y-0">
		<div class="col-span-10 min-h-[56px] md:col-span-7">
			<input
				placeholder="your@email.com"
				name="newsLetterField"
				type="text"
				class="bg-tertiary-300 dark:bg-primary-900 text-surface-900 placeholder:text-surface-900
				dark:text-surface-300 dark:placeholder:text-surface-300 h-full w-full text-sm
				md:px-[32px] md:py-[17px]"
			/>
		</div>
		<SimpleButton
			variant="ghost"
			btnText="Sign up"
			btnWidth="col-span-10 md:col-span-3"
			rounded="rounded-none"
		/>
	</div>
{:else if version === 2}
	<!-- version 2 -->
	<div class="grid h-full w-full grid-cols-10 gap-6 md:gap-0">
		<div class="col-span-10 min-h-[56px] md:col-span-7">
			<input
				placeholder="your@email.com"
				name="joingTheClubField"
				type="text"
				class="text-surface-950 placeholder:text-surface-950
				dark:text-surface-contrast-950 dark:placeholder:text-surface-contrast-950
				
				bg-surface-200 dark:bg-surface-contrast-200 h-full w-full text-sm md:px-[32px] md:py-[17px]"
			/>
		</div>
		<SimpleButton
			variant="primary"
			btnText="Sign up"
			btnWidth="col-span-10 md:col-span-3"
			rounded="rounded-none"
		/>
	</div>
{/if}
