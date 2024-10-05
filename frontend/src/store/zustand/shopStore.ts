import type { SelectorFn } from "@zayne-labs/toolkit/type-helpers";
import { toast } from "sonner";
import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import type { ShopStore } from "./zustand-store.types";

const toastMessages = {
	added: "Product added successfully",
	removed: "Product was removed from cart",
	updated: "Item quantity has been updated",
};

// Store Object creation
const shopStateObjectFn: StateCreator<ShopStore> = (set, get) => ({
	cart: [],
	wishList: [],

	// eslint-disable-next-line perfectionist/sort-objects
	actions: {
		addToCart: (productItem) => {
			const { cart } = get();

			const isProductItemInCart = cart.some((item) => item.id === productItem.id);

			if (isProductItemInCart) {
				const { incrementProductQuantity } = get().actions;

				incrementProductQuantity(productItem.id);

				return;
			}

			set({ cart: [...cart, { ...productItem, quantity: 1 }] });

			toast.success(toastMessages.added, { position: "top-center" });
		},

		decrementProductQuantity: (productId) => {
			const { removeProductFromCart, updateProductQuantity } = get().actions;

			const productItemInCart = get().cart.find((item) => item.id === productId);

			if (!productItemInCart) return;

			if (productItemInCart.quantity === 1) {
				removeProductFromCart(productId);
				return;
			}

			updateProductQuantity(productId, { updatedQuantity: productItemInCart.quantity - 1 });

			toast.success(toastMessages.updated, { position: "top-center" });
		},

		incrementProductQuantity: (productId) => {
			const { updateProductQuantity } = get().actions;

			const productItemInCart = get().cart.find((item) => item.id === productId);

			if (!productItemInCart || productItemInCart.quantity >= productItemInCart.stock) return;

			updateProductQuantity(productId, { updatedQuantity: productItemInCart.quantity + 1 });

			toast.success(toastMessages.updated, { position: "top-center" });
		},

		removeProductFromCart: (productId) => {
			const updatedCart = get().cart.filter((item) => item.id !== productId);

			set({ cart: updatedCart });

			toast.success(toastMessages.removed, { position: "top-center" });
		},

		toggleAddToWishList: (productItem) => {
			const { wishList } = get();
			const isItemInWishList = wishList.some((item) => item.id === productItem.id);

			const newWishList = !isItemInWishList
				? [...wishList, productItem]
				: wishList.filter((item) => item.id !== productItem.id);

			set({ wishList: newWishList });
		},

		updateProductQuantity: (productId, { updatedQuantity }) => {
			const updatedCart = get().cart.map((item) => {
				if (item.id === productId) {
					return {
						...item,
						quantity: updatedQuantity > 1 ? updatedQuantity : item.quantity,
					};
				}
				return item;
			});

			set({ cart: updatedCart });
		},
	},
});

// Store hook Creation
export const useShopStore = create(
	persist(shopStateObjectFn, {
		name: "shop",
		partialize: ({ actions, ...actualState }) => actualState,
		version: 1,
	})
);

export const useShopStoreShallow = <TResult>(selector: SelectorFn<ShopStore, TResult>) =>
	useShopStore(useShallow(selector));

Object.assign(useShopStoreShallow, useShopStore);

// Actions hook
export const useShopActions = () => useShopStore((state) => state.actions);
