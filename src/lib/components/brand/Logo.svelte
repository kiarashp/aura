<script lang="ts">
	import LogoMark from './LogoMark.svelte';

	// The full logo: the mark plus the word "aura" in the brand font (Fraunces).
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}
	let { size = 'md', class: className = '' }: Props = $props();
	const markSize = { sm: 28, md: 36, lg: 56 }[size];
	const textSize = { sm: 'text-2xl', md: 'text-3xl', lg: 'text-5xl' }[size];
</script>

<span class="inline-flex items-center gap-2 {className}">
	<LogoMark size={markSize} />
	<span class="font-brand {textSize} font-semibold leading-none tracking-tight">aura</span>
</span>
