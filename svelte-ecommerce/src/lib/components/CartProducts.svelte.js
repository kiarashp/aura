

import { getContext, setContext } from "svelte";
function Cart() {
    const initialCartProducts = []
    let cartProducts = $state(initialCartProducts)
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

        get cartProducts() { return cartProducts },
        addToCart(product, quantity) {
            const existingItem = cartProducts.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity

            } else {

                cartProducts.push({
                    product,
                    quantity
                })
            }
            this.saveToStorage()


        },
        removeFromCart(product) {
            cartProducts = cartProducts.filter((item) => item.product.id !== product.id)
            this.saveToStorage()

        },
        increaseByOne(product) {
            const existingItem = cartProducts.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1
            }
            this.saveToStorage()
        },
        decreaseByOne(product) {
            const existingItem = cartProducts.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.quantity -= 1
                if (existingItem.quantity <= 0) {
                    cartProducts = cartProducts.filter(item => item.product.id !== product.id);
                }
            }
            this.saveToStorage()
        }

    }
}

const theKey = Symbol('cart');
export function setCart() {
    const cart = Cart();
    return setContext(theKey, cart);
}

export function getCart() {
    return getContext(theKey);
}



