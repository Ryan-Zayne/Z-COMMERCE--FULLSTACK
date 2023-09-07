import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ShopStore } from './zustand-store.types';

// Store Object creation
const shopStateObject: StateCreator<ShopStore> = (set, get) => ({
	cart: [],
	wishList: [],

	shopActions: {
		addToCart: (product, quantity = 1) => {
			const { cart } = get();
			const isProductInCart = cart.some((item) => item.id === product.id);

			const newCart = !isProductInCart
				? [...cart, { ...product, quantity }]
				: cart.map((item) => {
						if (item.id === product.id) {
							return { ...item, quantity: item.quantity + quantity };
						}
						return item;
				  });

			set({ cart: newCart });
		},

		removeProductFromCart: (product) => {
			const newCart = get().cart.filter((item) => item.id !== product.id);
			set({ cart: newCart });
		},

		decreaseProductQuantity: (product) => {
			const newCart = get().cart.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity !== 0 ? item.quantity - 1 : item.quantity };
				}
				return item;
			});

			set({ cart: newCart });
		},

		toggleAddToWishList: (product) => {
			const { wishList } = get();
			const isItemInWishList = wishList.some((item) => item.id === product.id);

			const newWishList = !isItemInWishList
				? [...wishList, { ...product }]
				: wishList.filter((item) => item.id !== product.id);

			set({ wishList: newWishList });
		},
	},
});

// Store hook Creation
export const useShopStore = create<ShopStore>()(
	persist(shopStateObject, {
		name: 'shop',
		partialize: ({ shopActions, ...state }) => state,
	})
);

// Actions hook
export const useShopActions = () => useShopStore((state) => state.shopActions);

if (import.meta.env.NODE_ENV === 'development') {
	mountStoreDevtool('Store1', useShopStore);
}
