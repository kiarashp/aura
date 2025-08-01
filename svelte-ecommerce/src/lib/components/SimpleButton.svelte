<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLButtonAttributes {
		btnText?: string;
		btnWidth?: string;
		btnHeight?: string;
		children?: Snippet;
		customClasses?: string;
		variant?: string;
		rounded?: string;
	}

	const {
		btnText = 'Button',
		btnWidth = 'w-[176px]',
		btnHeight = 'min-h-[56px]',
		customClasses = '',
		variant = 'secondary',
		rounded= "rounded-sm",
		children,
		...restProps
	}: Props = $props();

	// Base classes that all buttons share
	const baseClasses = 'cursor-pointer transition duration-300 text-base md:text-lg';

	// Variant-specific classes
	const getVariantClasses = (variant: string) => {
		switch (variant) {
			case 'primary':
				return 'bg-primary-500 hover:bg-primary-800 active:bg-primary-400 dark:bg-primary-400 dark:hover:bg-primary-600 dark:active:bg-primary-300 text-white';
			case 'secondary':
				return 'hover:bg-borderdark text-primary-950 dark:text-surface-900 bg-primary-50 dark:bg-tertiary-400 active:bg-primary-950 active:text-surface-100 dark:hover:bg-tertiary-600 dark:active:bg-tertiary-950';
			case 'outline':
				return 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white active:bg-primary-600 dark:border-primary-400 dark:text-primary-400';
			case 'ghost':
				return 'text-primary-500 bg-surface-300  hover:bg-primary-100 active:bg-primary-400 dark:text-primary-400 dark:bg-primary-100 dark:hover:bg-primary-200 dark:active:bg-primary-400';
			case 'success':
				return 'bg-success-500 hover:bg-success-700 active:bg-success-400 dark:bg-success-600 dark:hover:bg-success-800 dark:active:bg-success-500 text-success-contrast-500';
			case 'error':
				return 'bg-error-500 hover:bg-error-700 active:bg-error-400 dark:bg-error-600 dark:hover:bg-error-800 dark:active:bg-error-500 text-error-contrast-500';
			case 'warning':
				return 'bg-warning-500 hover:bg-warning-700 active:bg-warning-400 dark:bg-warning-600 dark:hover:bg-warning-800 dark:active:bg-warning-500 text-warning-contrast-500';
			case 'success-outline':
				return 'border-2 border-success-500 text-success-500 hover:bg-success-500 hover:text-success-contrast-500 active:bg-success-600 dark:border-success-400 dark:text-success-400 dark:hover:text-success-contrast-500';
			case 'error-outline':
				return 'border-2 border-error-500 text-error-500 hover:bg-error-500 hover:text-error-contrast-500 active:bg-error-600 dark:border-error-400 dark:text-error-400 dark:hover:text-error-contrast-500';
			case 'warning-outline':
				return 'border-2 border-warning-500 text-warning-500 hover:bg-warning-500 hover:text-warning-contrast-500 active:bg-warning-600 dark:border-warning-400 dark:text-warning-400 dark:hover:text-warning-contrast-500';
			case 'success-ghost':
				return 'text-success-600 bg-success-50 hover:bg-success-100 active:bg-success-200 dark:text-success-400 dark:bg-success-950 dark:hover:bg-success-900 dark:active:bg-success-800';
			case 'error-ghost':
				return 'text-error-600 bg-error-50 hover:bg-error-100 active:bg-error-200 dark:text-error-400 dark:bg-error-950 dark:hover:bg-error-900 dark:active:bg-error-800';
			case 'warning-ghost':
				return 'text-warning-600 bg-warning-50 hover:bg-warning-100 active:bg-warning-200 dark:text-warning-400 dark:bg-warning-950 dark:hover:bg-warning-900 dark:active:bg-warning-800';
			case 'custom':
				return '';
			default:
				return 'hover:bg-borderdark text-primary-950 dark:text-surface-900 bg-primary-50 dark:bg-tertiary-400 active:bg-primary-950 active:text-surface-100 dark:hover:bg-tertiary-600 dark:active:bg-tertiary-950';
		}
	};

	// Combine all classes
	const buttonClasses = [
		baseClasses,
		getVariantClasses(variant),
		btnWidth,
		btnHeight,
		customClasses,
		rounded
	]
		.filter(Boolean)
		.join(' ');
</script>

<button class={buttonClasses} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<span>{btnText}</span>
	{/if}
</button>
