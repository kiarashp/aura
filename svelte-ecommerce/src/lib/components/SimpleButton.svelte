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
	 min-h-[56px] text-primary-950 dark:text-surface-900 bg-primary-50 dark:bg-tertiary-400  active:bg-primary-950 active:text-surface-100 dark:hover:bg-tertiary-600 dark:active:bg-tertiary-950" {...restProps} >
	{#if children}
		{@render children()}
	{:else}
		<span>{btnText}</span>
	{/if}
</button>