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

	if (isPending) {
		return <LoadingSkeleton count={15} />;
	}

	return (
		<>
			<Hero />
			<Categories />

			<section id="Products Section" className="flex flex-col gap-[6rem] px-[2rem] pt-[6rem]">
				<HotSalesProducts data={hotSalesProductsArray} />
				<RecentProducts data={recentlyViewedProductsArray} />
				<SimilarProducts data={similarProductsArray} />
			</section>
		</>
	);
}

export default Home;
