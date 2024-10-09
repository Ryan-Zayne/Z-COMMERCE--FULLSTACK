import { LoadingSkeleton } from "@/components/ui";
import { useGetHomePageProducts } from "@/store/react-query/useGetHomePageProducts";
import HotSalesProducts from "./HotSalesProducts";
import RecentProducts from "./RecentProducts";
import SimilarProducts from "./SimilarProducts";

function HomeProductSection() {
	const { hotSalesProducts, isPending, recentlyViewedProducts, similarProducts } =
		useGetHomePageProducts();

	if (isPending) {
		return <LoadingSkeleton count={20} />;
	}

	return (
		<section id="Products Section" className="flex flex-col gap-[6rem] px-[2rem] pt-[6rem]">
			<HotSalesProducts data={hotSalesProducts} />
			<RecentProducts data={recentlyViewedProducts} />
			<SimilarProducts data={similarProducts} />
		</section>
	);
}

export default HomeProductSection;
