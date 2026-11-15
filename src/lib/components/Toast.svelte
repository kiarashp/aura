<script lang="ts">
	import { fly } from 'svelte/transition';
	import X from '@lucide/svelte/icons/x';
	import Check from '@lucide/svelte/icons/check';
	import { toast } from '$lib/toast.svelte';
</script>

<!-- Screen readers announce the note too (aria-live). -->
<div class="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4 sm:bottom-6" aria-live="polite">
	{#if toast.current}
		{#key toast.current.id}
			<div
				class="bg-primary-950 text-surface-50 pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl p-3 pr-2 shadow-[0_20px_50px_-15px_rgb(23_20_43/0.6)] ring-1 ring-white/10"
				in:fly={{ y: 24, duration: 300 }}
				out:fly={{ y: 24, duration: 200 }}
			>
				{#if toast.current.image}
					<img src={toast.current.image} alt="" class="size-12 shrink-0 rounded-lg object-cover" />
				{:else}
					<span class="bg-mint-400 text-primary-950 grid size-8 shrink-0 place-items-center rounded-full">
						<Check size={16} aria-hidden="true" />
					</span>
				{/if}
				<div class="min-w-0 grow">
					<p class="font-medium">{toast.current.title}</p>
					{#if toast.current.text}<p class="text-tertiary-400 truncate text-sm">{toast.current.text}</p>{/if}
				</div>
				{#if toast.current.link}
					<a
						href={toast.current.link.href}
						onclick={() => toast.hide()}
						class="bg-mint-400 text-primary-950 hover:bg-mint-300 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors"
						>{toast.current.link.label}</a
					>
				{/if}
				<button
					type="button"
					aria-label="Close"
					onclick={() => toast.hide()}
					class="text-tertiary-400 hover:text-surface-50 grid size-8 shrink-0 cursor-pointer place-items-center rounded-full"
				>
					<X size={16} aria-hidden="true" />
				</button>
			</div>
		{/key}
	{/if}
</div>
