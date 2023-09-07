// Global State Types
import type { ResponseDataItem } from '../react-query/query-hook.types';

export type GlobalStateSlice = {
	isNavShow: boolean;
	isSearchShow: boolean;
	globalActions: {
		toggleNavShow: () => void;
		toggleSearchShow: () => void;
	};
};

export type MediaQuerySlice = {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	mediaQueryActions: {
		setIsMobile: () => void;
		setIsTablet: () => void;
		setIsDesktop: () => void;
	};
};
export type GlobalStore = GlobalStateSlice & MediaQuerySlice;

// ThemeState Types
export type ThemeStore = {
	theme: string;
	isDarkMode: boolean;
	themeActions: {
		toggleTheme: () => void;
		toggleIsDarkMode: () => void;
	};
};

// ShopState Types
export type ShopStore = {
	cart: Array<ResponseDataItem & { quantity: number }>;
	wishList: Array<ResponseDataItem>;
	shopActions: {
		addToCart: (product: ResponseDataItem, quantity?: number) => void;
		removeProductFromCart: (product: ResponseDataItem) => void;
		decreaseProductQuantity: (product: ResponseDataItem) => void;
		toggleAddToWishList: (product: ResponseDataItem) => void;
	};
};
