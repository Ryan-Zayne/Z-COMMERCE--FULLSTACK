import { assertDefined } from "@zayne-labs/toolkit-type-helpers";
import { ProductCard } from "@/components/ui/ProductCard";
import type { DataArrayProp } from "./types";

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
		<article id="Recently Viewed" className="flex flex-col gap-[30px] px-[30px]">
			<h2 className="text-[25px] font-[700] max-md:text-center lg:text-[30px]">Recently Viewed</h2>

			<ul
				className="grid grid-cols-[repeat(auto-fit,_minmax(230px,1fr))] justify-items-center gap-[30px]
					lg:gap-[50px]"
			>
				{ProductCards}
			</ul>
		</article>
	);
}
export default RecentProducts;
