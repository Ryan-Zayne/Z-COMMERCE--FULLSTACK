import { assertDefined } from '@/lib/types/global-type-helpers.ts';
import { useGetAllProducts } from './useGetAllProducts.ts';

const possibleCategories = ['smartphones', 'laptops', 'watches', 'vehicles', 'lighting'] as const;

const useGetProductCategory = (productCategory: string | undefined) => {
	const { allProductsArray, isError, isPending } = useGetAllProducts();

	if (!productCategory || !possibleCategories.includes(productCategory)) {
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
		isPending,
		isError,
		productsArray: assertDefined(productsArray),
	};
};

export { useGetProductCategory };
