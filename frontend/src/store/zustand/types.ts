import type { DummyResponseDataItem } from "../react-query/types";
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

// ThemeState Types
export type ThemeStore = {
	actions: {
		initThemeOnLoad: () => void;
		toggleTheme: () => void;
	};

	isDarkMode: boolean;

	theme: string;
};

// ShopState Types
export type ResponseDataItemInCart = DummyResponseDataItem & { quantity: number };

export type ShopStore = {
	actions: {
		addToCart: (productItem: DummyResponseDataItem) => void;

		decrementProductQuantity: (productId: DummyResponseDataItem["id"]) => void;

		incrementProductQuantity: (productId: DummyResponseDataItem["id"]) => void;

		removeProductFromCart: (productId: DummyResponseDataItem["id"]) => void;

		toggleAddToWishList: (productItem: DummyResponseDataItem) => void;

		updateProductQuantity: (
			productId: DummyResponseDataItem["id"],
			newData: { updatedQuantity: number }
		) => void;
	};

	cart: ResponseDataItemInCart[];

	wishList: DummyResponseDataItem[];
};
