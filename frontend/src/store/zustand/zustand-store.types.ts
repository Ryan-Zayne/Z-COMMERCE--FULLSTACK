import type { DummyResponseDataItem } from '../react-query/react-query-store.types';

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
export type ResponseDataItemInCart = DummyResponseDataItem & { quantity: number };

export type ShopStore = {
	cart: ResponseDataItemInCart[];
	wishList: DummyResponseDataItem[];

	shopActions: {
		addToCart: (productItem: DummyResponseDataItem) => void;
		updateProductQuantity: (
			productId: DummyResponseDataItem['id'],
			newData: { updatedQuantity: number }
		) => void;
		removeProductFromCart: (productId: DummyResponseDataItem['id']) => void;
		decrementProductQuantity: (productId: DummyResponseDataItem['id']) => void;
		incrementProductQuantity: (productId: DummyResponseDataItem['id']) => void;
		toggleAddToWishList: (productItem: DummyResponseDataItem) => void;
	};
};
