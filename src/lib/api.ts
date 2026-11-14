import { error } from '@sveltejs/kit';

/**
 * Fetch JSON from our own API inside a page's load function.
 * A 404 from the API becomes a real 404 page; any other failure becomes a "something went wrong" page.
 */
export async function getJson<T>(fetch: typeof globalThis.fetch, path: string): Promise<T> {
	const res = await fetch(path);
	if (res.status === 404) error(404, 'Not found');
	if (!res.ok) error(res.status >= 500 ? 503 : res.status, 'Could not load this page');
	return res.json();
}
