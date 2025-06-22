import { assertDefined } from "@zayne-labs/toolkit-type-helpers";
import { ProductCard } from "@/components/ui/ProductCard";
import type { DataArrayProp } from "./types";

function HotSalesProducts({ data }: DataArrayProp) {
	const ProductCards = data.map((product) => (
		<ProductCard
			key={product?.id}
			link={`/products/${product?.category}/${product?.id}`}
			image={product?.images[0] ?? ""}
			productItem={assertDefined(product)}
		/>
	));

	return (
		<article id="Hot Sales" className="flex flex-col gap-[50px] px-[30px]">
			<h2 className="text-[25px] font-bold max-md:text-center lg:text-[30px]">Hot Sales</h2>

			<ul
				className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] justify-items-center gap-[30px]
					lg:gap-[50px]"
			>
				{ProductCards}
			</ul>
		</article>
	);
}

export default HotSalesProducts;
