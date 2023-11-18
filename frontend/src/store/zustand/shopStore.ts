import { useCallbackRef } from '@/hooks/index.ts';
import { toast } from 'react-hot-toast';
import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { ShopStore } from './zustand-store.types';

const toastInfo = {
	added: {
		message: 'Product added successfully',
		id: 'toastId-added',
	},
	updated: {
		message: 'Item quantity has been updated',
		id: 'toastId-updated',
	},
	removed: {
		message: 'Product was removed from cart',
		id: 'toastId-removed',
	},
};

// Store Object creation
const shopStateObjectFn: StateCreator<ShopStore> = (set, get) => ({
	cart: [],
	wishList: [],

	shopActions: {
		addToCart: (productItem) => {
			const { cart } = get();

			const isProductItemInCart = cart.some((item) => item.id === productItem.id);

			if (isProductItemInCart) {
				const { incrementProductQuantity } = get().shopActions;

				incrementProductQuantity(productItem.id);

				return;
			}

			set({ cart: [...cart, { ...productItem, quantity: 1 }] });

			toast.success(toastInfo.added.message, { id: toastInfo.added.id });
			toast.dismiss(toastInfo.removed.id);
		},

		incrementProductQuantity: (productId) => {
			const { updateProductQuantity } = get().shopActions;

			const productItemInCart = get().cart.find((item) => item.id === productId);

			if (!productItemInCart || productItemInCart.quantity >= productItemInCart.stock) return;

			updateProductQuantity(productId, { updatedQuantity: productItemInCart.quantity + 1 });

			toast.success(toastInfo.updated.message, { id: toastInfo.updated.id });
			toast.dismiss(toastInfo.added.id);
		},

		decrementProductQuantity: (productId) => {
			const { updateProductQuantity } = get().shopActions;

			const productItemInCart = get().cart.find((item) => item.id === productId);

			if (!productItemInCart) return;

			updateProductQuantity(productId, { updatedQuantity: productItemInCart.quantity - 1 });

			toast.success(toastInfo.updated.message, { id: toastInfo.updated.id });
			toast.dismiss(toastInfo.added.id);
		},

		removeProductFromCart: (productId) => {
			const updatedCart = get().cart.filter((item) => item.id !== productId);

			set({ cart: updatedCart });

			toast.success(toastInfo.removed.message, { id: toastInfo.removed.id });
			toast.dismiss(toastInfo.updated.id);
			toast.dismiss(toastInfo.added.id);
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
export const useShopStore = create<ShopStore>()(
	persist(shopStateObjectFn, {
		name: 'shop',
		version: 1,
		partialize: ({ shopActions, ...actualState }) => actualState,
	})
);

export const useShopStoreShallow = <TState>(callbackFn: (state: ShopStore) => TState) => {
	const selector = useCallbackRef(callbackFn);

	return useShopStore(useShallow(selector));
};

// Actions hook
export const useShopActions = () => useShopStore((state) => state.shopActions);
