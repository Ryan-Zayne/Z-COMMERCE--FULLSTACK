import ProductCard from "@/components/ui/ProductCard";
import { assertDefined } from "@/lib/type-helpers/assert";
import type { DataArrayProp } from "./home-product.types";

function RecentProducts({ data }: DataArrayProp) {
	const ProductCards = data
		.filter((product) => product?.id !== 3)
		.map((product) => (
			<ProductCard
				key={product?.id}
				link={`/products/${product?.category}/${product?.id}`}
				image={product?.images[0] ?? ""}
				productItem={assertDefined(product)}
			/>
		));

	return (
		<article id="Recently Viewed" className="flex flex-col gap-[3rem] px-[3rem]">
			<h2 className="text-[2.5rem] font-[700] max-md:text-center lg:text-[3rem]">Recently Viewed</h2>

			<ul
				className="grid grid-cols-[repeat(auto-fit,_minmax(23rem,1fr))] justify-items-center
					gap-[3rem_1.5rem]"
			>
				{ProductCards}
			</ul>
		</article>
	);
}
export default RecentProducts;
