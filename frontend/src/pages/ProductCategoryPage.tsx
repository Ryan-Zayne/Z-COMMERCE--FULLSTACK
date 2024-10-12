import { getElementList } from "@/components/primitives";
import { IconBox } from "@/components/primitives/IconBox";
import { LoadingSkeleton, ProductCard } from "@/components/ui";
import { useGetProductByCategory } from "@/store/react-query/useGetProductByCategory";
import { assertDefined } from "@zayne-labs/toolkit/type-helpers";
import { Link } from "react-router-dom";

function ProductCategoryPage() {
	const { category, isPending, productsArrayByCategory } = useGetProductByCategory();

	const [ProductCategoryCardList] = getElementList();

	if (isPending) {
		return <LoadingSkeleton count={category === "watches" || category === "vehicles" ? 10 : 5} />;
	}

	return (
		<section className="mt-[3rem] lg:mt-[5rem]">
			<header className="flex items-center justify-center">
				<button type="button" className="ml-[3rem] text-[3rem]">
					<Link to={"/"}>
						<IconBox icon="typcn:arrow-back" />
					</Link>
				</button>

				<h1 className="mx-auto text-center text-[3rem] font-[700] capitalize lg:text-[4rem]">
					{category === "lighting" ? "Digital Lighting" : category}
				</h1>
			</header>

			<article className="mt-[4rem] px-[3rem]">
				<ProductCategoryCardList
					className="grid grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))] justify-items-center
						gap-[5rem_2rem]"
					each={productsArrayByCategory}
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
		</section>
	);
}

export default ProductCategoryPage;
