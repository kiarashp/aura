<script lang="ts">
	import { onMount } from 'svelte';

	let isDark: boolean = $state(getInitialDarkMode());

	function getInitialDarkMode(): boolean {
		if (typeof window === 'undefined') return false;

		// Check if user has a saved preference
		const saved = localStorage.getItem('darkMode');
		if (saved !== null) {
			return JSON.parse(saved);
		}

		// Fall back to system preference
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	// Apply dark class and save to localStorage
	function applyDarkMode(dark: boolean) {
		if (typeof window === 'undefined') return;

		const html = document.documentElement;
		if (dark) {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}

		// Save preference
		localStorage.setItem('darkMode', JSON.stringify(dark));
	}
	onMount(() => {
		// Apply initial state
		applyDarkMode(isDark);
	});

	function darkToggleHandler() {
		isDark = !isDark;
		applyDarkMode(isDark);
	}
</script>

<label class="flex gap-2 cursor-pointer items-center ">
	<input onclick={darkToggleHandler} type="checkbox" bind:checked={isDark} class="peer sr-only" />
	<div
		class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px]
		 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300
		  after:bg-white after:transition-all after:content-['']
		   peer-checked:bg-blue-600 peer-checked:after:translate-x-full
		    peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4
			 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full
			  dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-primary-500
			   dark:peer-focus:ring-primary"
	></div>
	{#if isDark}

		<svg xmlns="http://www.w3.org/2000/svg" width="0.75em" height="1em" viewBox="0 0 384 512" class="text-surface-200"
			><!-- Icon from Font Awesome Solid by Dave Gandy - https://creativecommons.org/licenses/by/4.0/ --><path
				fill="currentColor"
				d="M223.5 32C100 32 0 132.3 0 256s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
			/></svg
		>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" class="text-primary-950"
			><!-- Icon from Font Awesome Solid by Dave Gandy - https://creativecommons.org/licenses/by/4.0/ --><path
				fill="currentColor"
				d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391l-19.9 107.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391L13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256L2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121l19.9-107.9c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1l90.3-62.3c4.5-3.1 10.2-3.7 15.2-1.6M160 256a96 96 0 1 1 192 0a96 96 0 1 1-192 0m224 0a128 128 0 1 0-256 0a128 128 0 1 0 256 0"
			/></svg
		>
	{/if}
</label>
