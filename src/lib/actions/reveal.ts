// Fades and slides an element in the first time it scrolls into view.
// Use: <div use:reveal> or <div use:reveal={150}> (wait 150 ms first, for a staggered row).
// The look is in app.css (.reveal). Without JavaScript, or with "reduce motion" on, nothing is hidden.
export function reveal(node: HTMLElement, delay = 0) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	node.classList.add('reveal');
	node.style.transitionDelay = `${delay}ms`;
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('is-visible');
				observer.disconnect();
			}
		},
		{ rootMargin: '0px 0px -10% 0px' }
	);
	observer.observe(node);
	return { destroy: () => observer.disconnect() };
}
