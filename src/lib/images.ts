// Every site picture comes in two sizes: "name.webp" (big) and "name-sm.webp" (half the width).
// The browser picks the smaller one on phones, which saves a lot of data.
export const smallImage = (url: string) => url.replace(/\.webp$/, '-sm.webp');

// For <img srcset>: product and About pictures are 1200/600 px wide, banners 2400/1200 px.
export function imageSet(url: string, bigWidth = 1200) {
	if (!url.endsWith('.webp')) return undefined;
	return `${smallImage(url)} ${bigWidth / 2}w, ${url} ${bigWidth}w`;
}

// The wide picture at the top of each category page. Category slugs look like "/seating".
const banners: Record<string, string> = {
	'/seating': '/banners/seating.webp',
	'/tables': '/banners/tables.webp',
	'/storage': '/banners/storage.webp',
	'/beds': '/banners/beds.webp'
};
export const categoryBanner = (slug: string) => banners[slug] ?? '/banners/all.webp';

// One short line under each category title.
const lines: Record<string, string> = {
	'/seating': 'Sofas, chairs and ottomans to sink into.',
	'/tables': 'For long dinners and slow mornings.',
	'/storage': 'A place for everything, so rooms stay calm.',
	'/beds': 'Low, soft and made for resting.'
};
export const categoryLine = (slug: string) => lines[slug];
