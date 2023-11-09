import { assertDefined } from '@/lib/global-type-helpers';
import { useGetAllProducts } from './useGetAllProducts';

const possibleCategories = new Set(['smartphones', 'laptops', 'watches', 'vehicles', 'lighting']);

const useGetProductCategory = (productCategory: string | undefined) => {
	const { allProductsArray, isError, isLoading } = useGetAllProducts();

	if (!productCategory || !possibleCategories.has(productCategory)) {
		throw new Error('Category not found!');
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
