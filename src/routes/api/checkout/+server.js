import Stripe from "stripe";
import { STRIPEAPIKEY, HOSTNAME, API_VERSION } from "$env/static/private";

const stripe = new Stripe(STRIPEAPIKEY, {
    apiVersion: API_VERSION
})

export async function POST({ request }) {
    try {
        const { cartProducts } = await request.json();

        if (!cartProducts || cartProducts.length === 0) {
            return new Response(JSON.stringify({ error: "Cart is empty" }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        const lineItems = []
        cartProducts.map((eachCartItem) => {
            lineItems.push({
                price: eachCartItem.product.stripePriceId,
                quantity: eachCartItem.quantity
            })
        });
        console.log('lineItems :',lineItems)

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${HOSTNAME}payment-success`,
            cancel_url: `${HOSTNAME}payment-canceled`,
        });

        return new Response(JSON.stringify({ url: session.url }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return new Response(JSON.stringify({ error: "Failed to create checkout session", url: '/' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}