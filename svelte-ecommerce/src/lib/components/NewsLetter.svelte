<script lang="ts">
	interface props {
		version : number
	}
	let { version } : props = $props();
</script>

{#if version === 1}
	<!-- version 1 footer -->
	<div class="flex w-full h-full">
		<div class="w-7/10 h-full">
			<input
				placeholder="your@email.com"
				name="newsLetterField"
				type="text"
				class="h-full w-full bg-tertiary-300 dark:bg-primary-900 
				px-[32px] py-[17px] text-sm text-surface-900 placeholder:text-surface-900 
				dark:text-surface-300 dark:placeholder:text-surface-300"
			/>
		</div>
		<button
			class=" w-3/10 flex h-full cursor-pointer items-center justify-center
			 bg-primary-100 hover:bg-secondary-300 active:bg-secondary-500 
			 dark:bg-primary-300 dark:hover:bg-secondary-500 dark:active:bg-secondary-900
			 duration-200"
		>
			<span class="text-surface-950 dark:text-primary-950 text-xl">Sign up</span>
		</button>
	</div>
{:else if version === 2}
	<!-- version 2 -->
	<div class="flex w-full h-full">
		<div class="w-7/10 h-full">
			<input
				placeholder="your@email.com"
				name="joingTheClubField"
				type="text"
				class="text-surface-950 placeholder:text-surface-950
				dark:text-surface-contrast-950 dark:placeholder:text-surface-contrast-950
				
				bg-surface-200 dark:bg-surface-contrast-200 h-full w-full px-[32px] py-[17px] text-sm"
			/>
		</div>
		<button
			class="hover:bg-primary w-3/10 bg-darkprimary flex h-full cursor-pointer items-center justify-center duration-200"
		>
			<span class="text-base text-white">Sign up</span>
		</button>
	</div>
{/if}
