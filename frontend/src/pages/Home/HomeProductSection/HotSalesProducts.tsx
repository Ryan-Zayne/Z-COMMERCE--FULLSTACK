import { ProductCard } from "@/components/ui";
import { assertDefined } from "@/lib/type-helpers/assert";
import type { DataArrayProp } from "./home-product.types";

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
		<article id="Hot Sales" className="flex flex-col gap-[3rem] px-[3rem]">
			<h2 className="text-[2.5rem] font-[700] max-md:text-center lg:text-[3rem]">Hot Sales</h2>

			<ul
				className="grid grid-cols-[repeat(auto-fit,_minmax(23rem,1fr))] justify-items-center
					gap-[3rem_1.5rem]"
			>
				{ProductCards}
			</ul>
		</article>
	);
}

export default HotSalesProducts;
