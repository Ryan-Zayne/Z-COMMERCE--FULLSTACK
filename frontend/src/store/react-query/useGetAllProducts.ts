import { callDummyApi } from "@/lib/api/callDummyApi";
import { transformData } from "@/store/react-query/helpers/transFormData";
import { useQueries } from "@tanstack/react-query";

const useGetAllProducts = () => {
	const productQueries = [
		{ key: "smartphones", url: "/products/category/smartphones" },
		{ key: "laptops", url: "/products/category/laptops" },
		{ key: "mens-watches", url: "/products/category/mens-watches" },
		{ key: "womens-watches", url: "/products/category/womens-watches" },
		{ key: "automotive", url: "/products/category/automotive" },
		{ key: "motorcycle", url: "/products/category/motorcycle" },
		{ key: "lighting", url: "/products/category/lighting" },
	] as const;

	const {
		data: allProductsArray,
		isPending,
		isError,
	} = useQueries({
		queries: productQueries.map(({ key, url }) => ({
			queryKey: [key, { url }],
			queryFn: () => callDummyApi(url),
			select: transformData,
		})),

		combine: (resultsArray) => ({
			data: resultsArray.flatMap((item) => item.data).filter((product) => product?.id !== 3), // Filtered out 3rd product cuz it's faulty,
			isPending: resultsArray.some((item) => item.isPending),
			isError: resultsArray.some((item) => item.isError),
		}),
	});

	return { allProductsArray, isPending, isError };
};

export { useGetAllProducts };
