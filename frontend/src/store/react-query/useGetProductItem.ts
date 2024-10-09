import { useGetAllProducts } from "./useGetAllProducts";

const useGetProductItem = (productId: string | undefined) => {
	const { allProductsArray, isError, isPending } = useGetAllProducts();

	const productItem = allProductsArray.find((item) => item?.id === Number(productId));

	if (!isPending && !productItem) {
		throw new Error("Product not found!");
	}

	return { isError, isPending, productItem };
};

export { useGetProductItem };
