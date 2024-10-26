import { Show } from "@/components/primitives";
import { LoadingSkeleton } from "@/components/ui";
import { useGetAllProducts } from "@/store/react-query/useGetAllProducts";
import Categories from "./Categories";
import Hero from "./Hero";
import HotSalesProducts from "./ProductSections/HotSalesProducts";
import RecentProducts from "./ProductSections/RecentProducts";
import SimilarProducts from "./ProductSections/SimilarProducts";

function Home() {
	const {
		hotSalesProductsArray,
		isPending,
		recentlyViewedProductsArray,
		vehiclesProductsArray: similarProductsArray,
	} = useGetAllProducts();

	return (
		<>
			<Hero />
			<Categories />

			<section id="Products Section" className="flex flex-col gap-[6rem] px-[2rem] pt-[6rem]">
				<Show when={!isPending}>
					<HotSalesProducts data={hotSalesProductsArray} />
					<RecentProducts data={recentlyViewedProductsArray} />
					<SimilarProducts data={similarProductsArray} />

					<Show.Fallback>
						<LoadingSkeleton count={15} />
					</Show.Fallback>
				</Show>
			</section>
		</>
	);
}

export default Home;
