import { IconBox } from "@/components/primitives/IconBox";
import { LoadingSkeleton, ProductCard } from "@/components/ui";
import { assertDefined } from "@/lib/type-helpers/assert";
import { useGetProductCategory } from "@/store/react-query/useGetProductCategory";
import { Link, useParams } from "react-router-dom";

function ProductCategoryPage() {
	const { category } = useParams();
	const { productsArray, isPending } = useGetProductCategory(category);

	if (isPending) {
		return <LoadingSkeleton count={category === "watches" || category === "vehicles" ? 10 : 5} />;
	}

	const ProductCategoryCards = productsArray.map((product) => (
		<ProductCard
			key={product?.id}
			link={`/products/${product?.category}/${product?.id}`}
			image={product?.images[1] ?? ""}
			productItem={assertDefined(product)}
		/>
	));

	return (
		<section className="mt-[3rem] lg:mt-[5rem]">
			<header className="flex items-center justify-center">
				<button className="ml-[3rem] text-[3rem]">
					<Link to={"/"}>
						<IconBox icon="typcn:arrow-back" />
					</Link>
				</button>

				<h1 className="mx-auto text-center text-[3rem] font-[700] capitalize lg:text-[4rem]">
					{category === "lighting" ? "Digital Lighting" : category}
				</h1>
			</header>

			<article className="mt-[4rem] px-[3rem]">
				<ul
					className="grid grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))] justify-items-center
						gap-[5rem_2rem]"
				>
					{ProductCategoryCards}
				</ul>
			</article>
		</section>
	);
}

export default ProductCategoryPage;
