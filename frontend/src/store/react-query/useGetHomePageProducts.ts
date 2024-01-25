import { useGetAllProducts } from "./useGetAllProducts";

const useGetHomePageProducts = () => {
	const { allProductsArray, isError, isPending } = useGetAllProducts();

	const hotSalesProducts = allProductsArray.filter((item) => item?.category === "laptops");

	const recentlyViewedProducts = allProductsArray.filter((item) => item?.category === "smartphones");

	const similarProducts = [
		...allProductsArray.filter((item) => item?.category === "motorcycle"),
		...allProductsArray.filter((item) => item?.category === "automotive"),
	];

	return {
		isPending,
		isError,
		hotSalesProducts,
		recentlyViewedProducts,
		similarProducts,
	};
};

export { useGetHomePageProducts };
