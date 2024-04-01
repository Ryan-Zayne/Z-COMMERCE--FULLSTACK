import { assertDefined } from "@/lib/type-helpers/assert";
import { useGetAllProducts } from "./useGetAllProducts";

const possibleCategories = new Set(["smartphones", "laptops", "watches", "vehicles", "lighting"]);

const useGetProductCategory = (productCategory: string | undefined) => {
	const { allProductsArray, isError, isPending } = useGetAllProducts();

	if (!productCategory || !possibleCategories.has(productCategory)) {
		throw new Error("Category not found!");
	}

	const PRODUCTS_LOOKUP = new Map<string, typeof allProductsArray>([])
		.set(
			productCategory,
			allProductsArray.filter((item) => item?.category === productCategory)
		)
		.set("vehicles", [
			...allProductsArray.filter((item) => item?.category === "motorcycle"),
			...allProductsArray.filter((item) => item?.category === "automotive"),
		])
		.set("watches", [
			...allProductsArray.filter((item) => item?.category === "mens-watches"),
			...allProductsArray.filter((item) => item?.category === "womens-watches"),
		]);

	const productsArray = PRODUCTS_LOOKUP.get(productCategory);

	return {
		isPending,
		isError,
		productsArray: assertDefined(productsArray),
	};
};

export { useGetProductCategory };
