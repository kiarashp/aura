// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Product } from '@prisma/client';
import { Prisma } from '@prisma/client';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// Which public demo login the visitor is using, if any (see src/lib/server/demo.ts).
			account: import('$lib/server/demo').Account | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

	}
			interface CartItem {
			product: Product;
			quantity: number;
		}
}

export {};

export type ProductWithCategory = Prisma.ProductGetPayload<{
	include: { category: true };
}>;
export type CategoryWithProducts = Prisma.CategoryGetPayload<{
	include: { products: true };
}>;
