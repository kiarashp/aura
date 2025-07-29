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
				class="h-full w-full bg-[rgba(255,255,255,0.15)] px-[32px] py-[17px] text-sm text-white"
			/>
		</div>
		<button
			class="hover:bg-bordergrey w-3/10 flex h-full cursor-pointer items-center justify-center bg-white duration-200"
		>
			<span class="text-[rgba(42, 37, 75, 1)] text-xl">Sign up</span>
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
				class="text-[rgba(42, 37, 75, 0.20)] bg-lightgrey h-full w-full px-[32px] py-[17px] text-sm"
			/>
		</div>
		<button
			class="hover:bg-primary w-3/10 bg-darkprimary flex h-full cursor-pointer items-center justify-center duration-200"
		>
			<span class="text-base text-white">Sign up</span>
		</button>
	</div>
{/if}
