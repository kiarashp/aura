<script lang="ts">
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';

	// The switch's look (knob position, sun or moon) comes only from the `dark` class on <html>,
	// which a tiny script in app.html sets before the page is drawn. So the switch is right from the
	// first moment. (It used to start as "light" and jump a split second later: the "blink".)
	let isDark = $state(false);
	$effect(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggle() {
		isDark = !isDark;
		const html = document.documentElement;
		// Switch off colour animations for one moment, so the whole page changes at once
		// instead of some parts fading slower than others.
		html.classList.add('theme-switching');
		html.classList.toggle('dark', isDark);
		try {
			localStorage.setItem('darkMode', JSON.stringify(isDark));
		} catch {
			// private window: the choice just isn't remembered
		}
		requestAnimationFrame(() =>
			requestAnimationFrame(() => html.classList.remove('theme-switching'))
		);
	}
</script>

<button
	type="button"
	role="switch"
	aria-checked={isDark}
	aria-label="Dark mode"
	onclick={toggle}
	class="group flex cursor-pointer items-center gap-2 rounded-full p-1"
>
	<span
		class="bg-tertiary-300 dark:bg-primary-500 relative h-6 w-11 rounded-full transition-colors
		group-focus-visible:ring-primary-400 group-focus-visible:ring-2"
	>
		<span
			class="absolute start-[2px] top-[2px] grid h-5 w-5 place-items-center rounded-full bg-white shadow
			transition-transform duration-200 dark:translate-x-5"
		>
			<Sun size={12} class="text-secondary-900 dark:hidden" aria-hidden="true" />
			<Moon size={12} class="text-primary-700 hidden dark:block" aria-hidden="true" />
		</span>
	</span>
</button>
