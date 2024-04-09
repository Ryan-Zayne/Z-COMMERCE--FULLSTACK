import type { DummyResponseDataItem } from "../react-query/react-query-store.types";
import type { MEDIA_QUERY_LOOKUP } from "./globalStore/slices/mediaQuerySlice";

// Global State Types
export type GlobalStateSlice = {
	isNavShow: boolean;

	globalActions: {
		toggleNavShow: () => void;
	};
};

export type MediaQuerySlice = {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;

	mediaQueryActions: {
		setQuery: (query: keyof typeof MEDIA_QUERY_LOOKUP) => () => void;
		handleQueryListeners: (action: "add" | "remove") => void;
	};
};

export type GlobalStore = GlobalStateSlice & MediaQuerySlice;

// ThemeState Types
export type ThemeStore = {
	theme: string;
	isDarkMode: boolean;

	actions: {
		toggleTheme: () => void;
		initThemeOnLoad: () => void;
	};
};

// ShopState Types
export type ResponseDataItemInCart = DummyResponseDataItem & { quantity: number };

export type ShopStore = {
	cart: ResponseDataItemInCart[];
	wishList: DummyResponseDataItem[];

	shopActions: {
		addToCart: (productItem: DummyResponseDataItem) => void;

		updateProductQuantity: (
			productId: DummyResponseDataItem["id"],
			newData: { updatedQuantity: number }
		) => void;

		removeProductFromCart: (productId: DummyResponseDataItem["id"]) => void;

		decrementProductQuantity: (productId: DummyResponseDataItem["id"]) => void;

		incrementProductQuantity: (productId: DummyResponseDataItem["id"]) => void;

		toggleAddToWishList: (productItem: DummyResponseDataItem) => void;
	};
};
