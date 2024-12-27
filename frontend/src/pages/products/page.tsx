import { IconBox } from "@/components/primitives/IconBox";
import { LoadingSkeleton, ProductCard } from "@/components/ui";
import { useGetAllProducts } from "@/store/react-query/useGetAllProducts";
import { assertDefined } from "@zayne-labs/toolkit/type-helpers";
import { Link } from "react-router";

function AllProductsPage() {
	const { allProductsArray, isPending } = useGetAllProducts();

	if (isPending) {
		return <LoadingSkeleton count={10} />;
	}

	const allProductCards = allProductsArray.map((product) => (
		<ProductCard
			key={product?.id}
			link={`${product?.category}/${product?.id}`}
			image={product?.images[1] ?? ""}
			productItem={assertDefined(product)}
		/>
	));

	return (
		<section className="mt-[3rem]">
			<header className="flex flex-row-reverse items-center justify-center px-[3rem]">
				<h1 className="mx-auto text-[3rem] font-[700] lg:text-[4rem]">All Products</h1>
				<button type="button" className="text-[3rem]">
					<Link to={"/"}>
						<IconBox icon="typcn:arrow-back" />
					</Link>
				</button>
			</header>

			<article className="mt-[8rem] px-[3rem]">
				<ul
					className="grid grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))] justify-items-center
						gap-[5rem_2rem]"
				>
					{allProductCards}
				</ul>
			</article>
		</section>
	);
}

export default AllProductsPage;
