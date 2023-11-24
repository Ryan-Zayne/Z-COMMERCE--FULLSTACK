import { useGetAllProducts } from './useGetAllProducts.ts';

const possibleProductIDs = new Set([
	1, 2, 4, 5, 6, 7, 8, 9, 10, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 86, 87, 88, 89, 90, 91, 92, 93, 94,
	95, 96, 97, 98, 99, 100,
]);

const useGetProductItem = (productId: number | string | undefined) => {
	const { isError, isPending, allProductsArray } = useGetAllProducts();

	if (!possibleProductIDs.has(Number(productId))) {
		throw new Error('Product not found!');
	}

	const productItem = allProductsArray.find((item) => item?.id === Number(productId));

	return { isError, isPending, productItem };
};

export { useGetProductItem };
