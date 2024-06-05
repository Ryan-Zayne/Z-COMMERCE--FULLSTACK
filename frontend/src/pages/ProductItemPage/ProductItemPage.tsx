import { LoadingSkeleton } from "@/components/ui";
import { assertDefined } from "@/lib/type-helpers/assert";
import { useGetProductItem } from "@/store/react-query/useGetProductItem";
import { useParams } from "react-router-dom";
import ItemDescription from "./ProductItem/ItemDescription";
import ItemHeader from "./ProductItem/ItemHeader";
import ItemHero from "./ProductItem/ItemHero";

function ProductItemPage() {
	const { productId } = useParams();
	const { isPending, productItem } = useGetProductItem(productId);

	if (isPending) {
		return <LoadingSkeleton type={"productItemPage"} />;
	}

	return (
		<section className="p-[1rem_2rem_8rem] lg:pt-[3rem]">
			<header className="mx-[0.5rem] flex items-center justify-between lg:mx-[3rem]">
				<ItemHeader productItem={assertDefined(productItem)} />
			</header>

			<div
				className="mt-[3rem] md:mt-[4.5rem] md:flex md:h-[47rem] md:justify-around md:gap-[4rem]
					md:px-[1rem] lg:mt-[6rem] lg:gap-[8rem]"
			>
				<ItemHero slideImages={productItem?.images ?? []} />

				<ItemDescription productItem={assertDefined(productItem)} />
			</div>
		</section>
	);
}

export default ProductItemPage;
