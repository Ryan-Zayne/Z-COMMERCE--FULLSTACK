// Global State Types
import type { ResponseDataItem } from '../react-query/react-query-store.types';

export type GlobalStateSliceType = {
	isNavShow: boolean;
	isSearchShow: boolean;
	isImageLoaded: boolean;

	globalActions: {
		toggleNavShow: () => void;
		toggleSearchShow: () => void;
		handleImageLoad: () => void;
	};
};

export type MediaQuerySliceType = {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;

	mediaQueryActions: {
		setIsMobile: () => void;
		setIsTablet: () => void;
		setIsDesktop: () => void;
	};
};
export type GlobalStoreType = GlobalStateSliceType & MediaQuerySliceType;

// ThemeState Types
export type ThemeStoreType = {
	theme: string;
	isDarkMode: boolean;

	themeActions: {
		toggleTheme: () => void;
		toggleIsDarkMode: () => void;
	};
};

// ShopState Types
export type ResponseDataItemInCart = ResponseDataItem & { quantity: number };

export type ShopStoreType = {
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
