import type { Product } from '@prisma/client';
import { getContext, setContext } from 'svelte';

const STORAGE_KEY = 'cartProducts';
const MAX_QUANTITY = 99;

export interface CartStore {
	readonly cartProducts: CartItem[];
	/** True once the saved cart has been read from the browser (never true during server rendering). */
	readonly loaded: boolean;
	readonly itemCount: number;
	loadFromLocalStorage(): void;
	/** Swap in fresh product data (name, price, picture) and drop products that no longer exist. */
	refresh(freshProducts: Product[]): void;
	addToCart(product: Product, quantity: number): void;
	removeFromCart(product: Product): void;
	increaseByOne(product: Product): void;
	decreaseByOne(product: Product): void;
	clear(): void;
}

function isCartItem(item: unknown): item is CartItem {
	const i = item as CartItem;
	return (
		typeof i?.product?.id === 'number' &&
		typeof i.product.price === 'number' &&
		Number.isInteger(i.quantity) &&
		i.quantity > 0
	);
}

function Cart(): CartStore {
	let cartProducts = $state<CartItem[]>([]);
	let loaded = $state(false);

	function save() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(cartProducts));
		} catch {
			// Storage can be full or blocked (private windows); the cart still works for this visit.
		}
	}

	function find(product: Product) {
		return cartProducts.find((item) => item.product.id === product.id);
	}

	return {
		get cartProducts() {
			return cartProducts;
		},
		get loaded() {
			return loaded;
		},
		get itemCount() {
			return cartProducts.reduce((sum, item) => sum + item.quantity, 0);
		},
		loadFromLocalStorage() {
			try {
				const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
				if (Array.isArray(saved)) {
					cartProducts = saved
						.filter(isCartItem)
						.map((i) => ({ ...i, quantity: Math.min(i.quantity, MAX_QUANTITY) }));
				}
			} catch {
				try {
					localStorage.removeItem(STORAGE_KEY);
				} catch {
					// ignore
				}
			}
			loaded = true;
		},
		refresh(freshProducts) {
			const byId = new Map(freshProducts.map((p) => [p.id, p]));
			cartProducts = cartProducts
				.filter((item) => byId.has(item.product.id))
				.map((item) => ({ ...item, product: byId.get(item.product.id)! }));
			save();
		},
		addToCart(product, quantity) {
			const existing = find(product);
			if (existing) {
				existing.quantity = Math.min(existing.quantity + quantity, MAX_QUANTITY);
			} else {
				cartProducts.push({ product, quantity: Math.min(quantity, MAX_QUANTITY) });
			}
			save();
		},
		removeFromCart(product) {
			cartProducts = cartProducts.filter((item) => item.product.id !== product.id);
			save();
		},
		increaseByOne(product) {
			const existing = find(product);
			if (existing && existing.quantity < MAX_QUANTITY) existing.quantity += 1;
			save();
		},
		decreaseByOne(product) {
			const existing = find(product);
			if (!existing) return;
			if (existing.quantity <= 1) {
				cartProducts = cartProducts.filter((item) => item.product.id !== product.id);
			} else {
				existing.quantity -= 1;
			}
			save();
		},
		clear() {
			cartProducts = [];
			save();
		}
	};
}

const theKey = Symbol('cart');
export function setCart() {
	return setContext(theKey, Cart());
}

export function getCart(): CartStore {
	return getContext(theKey);
}
