import { assertDefined } from '@/lib/global-type-helpers';
import { useLocation } from 'react-router-dom';
import { useGetAllProducts } from './useGetAllProducts';

const errorMessageDefaults = {
	'/wishlist': 'WishList page still under construction',
	'/contact': 'Contact page still under construction',
	'/checkout': 'Checkout page still under construction',
	default: 'Category not found!',
} as const;

const possibleCategories = new Set(['smartphones', 'laptops', 'watches', 'vehicles', 'lighting']);

const useGetProductCategory = (productCategory: string | undefined) => {
	const href = useLocation().pathname;

	const { allProductsArray, isError, isLoading } = useGetAllProducts();

	if (!productCategory || !possibleCategories.has(productCategory)) {
		const error = Object.hasOwn(errorMessageDefaults, href)
			? errorMessageDefaults[href as keyof typeof errorMessageDefaults]
			: errorMessageDefaults.default;

		throw new Error(error);
	}

	const PRODUCTS_LOOKUP = {
		[productCategory]: allProductsArray.filter((item) => item?.category === productCategory),

		vehicles: [
			...allProductsArray.filter((item) => item?.category === 'motorcycle'),
			...allProductsArray.filter((item) => item?.category === 'automotive'),
		],

		watches: [
			...allProductsArray.filter((item) => item?.category === 'mens-watches'),
			...allProductsArray.filter((item) => item?.category === 'womens-watches'),
		],
	};

	const productsArray = PRODUCTS_LOOKUP[productCategory];

	return {
		isLoading,
		isError,
		productsArray: assertDefined(productsArray),
	};
};

export { useGetProductCategory };
