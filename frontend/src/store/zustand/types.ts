import type { ProductItem } from "../react-query/types";
import type { MEDIA_QUERY_LOOKUP } from "./globalStore/slices/mediaQuerySlice";

// Global State Types
export type CommonStateSlice = {
	actions: {
		toggleNavShow: () => void;
	};

	isNavShow: boolean;
};

export type MediaQuerySlice = {
	actions: {
		handleQueryListeners: (action: "add" | "remove") => void;
		setQuery: (query: keyof typeof MEDIA_QUERY_LOOKUP) => () => void;
	};
	isDesktop: boolean;
	isMobile: boolean;

	isTablet: boolean;
};

export type GlobalStore = CommonStateSlice & MediaQuerySlice;

// ShopState Types
export type ResponseDataItemInCart = ProductItem & { quantity: number };

export type ShopStore = {
	actions: {
		addToCart: (productItem: ProductItem) => void;

		clearCart: () => void;

		decrementProductQuantity: (productId: ProductItem["id"]) => void;

		incrementProductQuantity: (productId: ProductItem["id"]) => void;

		removeProductFromCart: (productId: ProductItem["id"]) => void;

		toggleAddToWishList: (productItem: ProductItem) => void;

		updateProductQuantity: (productId: ProductItem["id"], newData: { updatedQuantity: number }) => void;
	};

	cart: ResponseDataItemInCart[];

	getTotalPrice: () => number;

	totalPrice: number;

	wishList: ProductItem[];
};
