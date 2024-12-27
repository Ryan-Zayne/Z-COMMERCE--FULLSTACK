import { useQueries } from "@tanstack/react-query";
import { productKeys, productQuery } from "./queryFactory";

const useGetAllProducts = () => {
	const {
		data: allProductsArray,
		isError,
		isPending,
	} = useQueries({
		combine: (resultsArray) => ({
			data: resultsArray.flatMap((item) => item.data),
			isError: resultsArray.some((item) => item.isError),
			isPending: resultsArray.some((item) => item.isPending),
		}),
		queries: productKeys.map((key) => productQuery(key)),
	});

	const recentlyViewedProductsArray = allProductsArray.filter((item) => item?.category === "smartphones");

	const hotSalesProductsArray = allProductsArray.filter((item) => item?.category === "laptops");

	const vehiclesProductsArray = [
		...allProductsArray.filter((item) => item?.category === "motorcycle"),
		...allProductsArray.filter((item) => item?.category === "automotive"),
	];

	const watchesProductsArray = [
		...allProductsArray.filter((item) => item?.category === "mens-watches"),
		...allProductsArray.filter((item) => item?.category === "womens-watches"),
	];

	return {
		allProductsArray,
		hotSalesProductsArray,
		isError,
		isPending,
		recentlyViewedProductsArray,
		vehiclesProductsArray,
		watchesProductsArray,
	};
};

export { useGetAllProducts };
