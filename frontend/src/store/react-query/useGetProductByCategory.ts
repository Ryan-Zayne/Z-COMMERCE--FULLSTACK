import type { InferEnum } from "@zayne-labs/toolkit/type-helpers";
import { useParams } from "react-router-dom";
import { useGetAllProducts } from "./useGetAllProducts";

// TODO - Remove once you start serving the products from your backend

const productCategories = new Set(["smartphones", "laptops", "lighting", "watches", "vehicles"] as const);

const useGetProductByCategory = () => {
	const { category } = useParams<{ category: InferEnum<typeof productCategories> }>();

	if (!category || !productCategories.has(category)) {
		throw new Error("Category not found!");
	}

	const { allProductsArray, vehiclesProductsArray, watchesProductsArray, ...restOfResult } =
		useGetAllProducts();

	const PRODUCTS_LOOKUP = new Map<string, typeof allProductsArray>([])
		.set(
			category,
			allProductsArray.filter((item) => item?.category === category)
		)
		.set("vehicles", vehiclesProductsArray)
		.set("watches", watchesProductsArray);

	return {
		category,
		productsArrayByCategory: PRODUCTS_LOOKUP.get(category) ?? [],
		...restOfResult,
	};
};

export { useGetProductByCategory };
