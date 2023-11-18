import type { ResponseDataItem } from '../react-query/react-query-store.types';

// Global State Types
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
	};
};

// ShopState Types
export type ResponseDataItemInCart = ResponseDataItem & { quantity: number };

export type ShopStore = {
	cart: Array<ResponseDataItemInCart>;
	wishList: Array<ResponseDataItem>;

	shopActions: {
		addToCart: (productItem: ResponseDataItem) => void;
		updateProductQuantity: (
			productId: ResponseDataItem['id'],
			{ updatedQuantity }: { updatedQuantity: number }
		) => void;
		removeProductFromCart: (productId: ResponseDataItem['id']) => void;
		decrementProductQuantity: (productId: ResponseDataItem['id']) => void;
		incrementProductQuantity: (productId: ResponseDataItem['id']) => void;
		toggleAddToWishList: (productItem: ResponseDataItem) => void;
	};
};
