import { Show } from "@/components/primitives";
import { LoadingSkeleton } from "@/components/ui";
import { useGetAllProducts } from "@/store/react-query/useGetAllProducts";
import Categories from "./components/Categories";
import Hero from "./components/Hero/Hero";
import HotSalesProducts from "./components/ProductSections/HotSalesProducts";
import RecentProducts from "./components/ProductSections/RecentProducts";
import SimilarProducts from "./components/ProductSections/SimilarProducts";

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
