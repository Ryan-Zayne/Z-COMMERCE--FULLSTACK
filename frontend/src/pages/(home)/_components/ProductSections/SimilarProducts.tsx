import { getElementList } from "@/components/primitives/for";
import { ProductCard } from "@/components/ui/ProductCard";
import { assertDefined } from "@zayne-labs/toolkit-type-helpers";
import type { DataArrayProp } from "./types";

function SimilarProducts({ data }: DataArrayProp) {
	const [ProductCardsList] = getElementList();

	return (
		<article id="Similar Products You Might Like" className="flex flex-col gap-[3rem] px-[3rem]">
			<h2 className="text-[2.5rem] font-[700] max-md:text-center lg:text-[3rem]">
				Similar Products You Might Like
			</h2>

			<ProductCardsList
				className="grid grid-cols-[repeat(auto-fit,_minmax(min(100%,23.6rem),_1fr))]
					justify-items-center gap-[3rem_1.5rem]"
				each={data}
				render={(product) => (
					<ProductCard
						key={product?.id}
						link={`/products/${product?.category}/${product?.id}`}
						image={product?.images[1] ?? ""}
						productItem={assertDefined(product)}
					/>
				)}
			/>
		</article>
	);
}
export default SimilarProducts;
