<script lang="ts">
	// Aura's mark: a purple circle with a soft mint glow around it (the "aura").
	// The same drawing is in static/favicon.svg for the browser tab.
	interface Props {
		size?: number;
		class?: string;
	}
	let { size = 40, class: className = '' }: Props = $props();
	// Each copy on the page needs its own gradient name.
	const uid = $props.id();
	const glowId = `aura-glow-${uid}`;
</script>

<svg width={size} height={size} viewBox="0 0 64 64" class={className} aria-hidden="true">
	<defs>
		<radialGradient id={glowId} cx="50%" cy="50%" r="50%">
			<stop offset="55%" stop-color="var(--color-mint-400)" stop-opacity="0.9" />
			<stop offset="100%" stop-color="var(--color-mint-400)" stop-opacity="0" />
		</radialGradient>
	</defs>
	<circle cx="32" cy="32" r="30" fill="url(#{glowId})" />
	<circle cx="32" cy="32" r="18" fill="var(--color-primary-500)" />
	<circle cx="26" cy="26" r="5" fill="var(--color-tertiary-500)" opacity="0.9" />
</svg>
