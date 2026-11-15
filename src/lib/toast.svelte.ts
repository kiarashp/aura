// A small note that pops up at the bottom of the screen for a few seconds ("Added to cart").
// One at a time: a new note replaces the old one. Shown by src/lib/components/Toast.svelte.
type Toast = { id: number; title: string; text?: string; image?: string; link?: { href: string; label: string } };

let current = $state<Toast | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;

export const toast = {
	get current() {
		return current;
	},
	show(t: Omit<Toast, 'id'>, ms = 4500) {
		current = { ...t, id: Date.now() };
		clearTimeout(timer);
		timer = setTimeout(() => (current = null), ms);
	},
	hide() {
		clearTimeout(timer);
		current = null;
	}
};
