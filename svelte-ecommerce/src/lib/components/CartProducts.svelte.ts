import type { Product } from '@prisma/client';
import { getContext, setContext } from 'svelte';



export interface CartStore {
	readonly cartProducts: CartItem[];
	saveToStorage(): void;
	loadFromLocalStorage(): void;
	addToCart(product: Product, quantity: number): void;
	removeFromCart(product: Product): void;
	increaseByOne(product: Product): void;
	decreaseByOne(product: Product): void;
}

function Cart() :CartStore {
	const initialCartProducts: CartItem[] = [];
	let cartProducts = $state(initialCartProducts);
    
	return {
		saveToStorage() {
			if (typeof localStorage === 'undefined') return;

			try {
				localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
			} catch (error) {
				console.warn('Failed to save cart to localStorage:', error);
			}
		},
		loadFromLocalStorage() {
			if (typeof localStorage === 'undefined') return;
			try {
				const saved = localStorage.getItem('cartProducts');
				if (saved) {
					const parsedItems = JSON.parse(saved);
					// Validate the data structure
					if (Array.isArray(parsedItems)) {
						cartProducts = parsedItems;
					}
				}
			} catch (error) {
				console.warn('Failed to load cart from localStorage:', error);
				// Clear corrupted data
				localStorage.removeItem('cartProducts');
			}
		},

		get cartProducts() {
			return cartProducts;
		},
		addToCart(product:Product, quantity:number) {
			const existingItem = cartProducts.find((item) => item.product.id === product.id);
			if (existingItem) {
				existingItem.quantity += quantity;
			} else {
				cartProducts.push({
					product,
					quantity
				});
			}
			this.saveToStorage();
		},
		removeFromCart(product:Product) {
			cartProducts = cartProducts.filter((item) => item.product.id !== product.id);
			this.saveToStorage();
		},
		increaseByOne(product:Product) {
			const existingItem = cartProducts.find((item) => item.product.id === product.id);
			if (existingItem) {
				existingItem.quantity += 1;
			}
			this.saveToStorage();
		},
		decreaseByOne(product:Product) {
			const existingItem = cartProducts.find((item) => item.product.id === product.id);
			if (existingItem) {
				existingItem.quantity -= 1;
				if (existingItem.quantity <= 0) {
					cartProducts = cartProducts.filter((item) => item.product.id !== product.id);
				}
			}
			this.saveToStorage();
		}
	};
}

const theKey = Symbol('cart');
export function setCart() {
	const cart = Cart();
	return setContext(theKey, cart);
}

export function getCart() :CartStore {
	return getContext(theKey);
}
