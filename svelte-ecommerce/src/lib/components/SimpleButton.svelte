<script lang="ts">
    
    import type { HTMLButtonAttributes } from "svelte/elements";
    import type { Snippet } from "svelte";

	interface Props extends HTMLButtonAttributes {
		btnText?: string;
		btnWidth?: string;
		children?: Snippet;
	}

	const { btnText = 'happy', btnWidth = 'w-[176px]', children, ...restProps }: Props = $props();


</script>


<button class="hover:bg-borderdark cursor-pointer transition duration-300 {btnWidth}
	 min-h-[56px] text-darkprimary bg-lightgrey active:bg-darkprimary active:text-white" {...restProps} >
	{#if children}
		{@render children()}
	{:else}
		<span>{btnText}</span>
	{/if}
</button>