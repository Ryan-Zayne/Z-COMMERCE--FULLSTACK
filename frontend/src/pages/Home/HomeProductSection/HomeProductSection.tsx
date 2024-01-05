import { LoadingSkeleton } from "@/components/ui/index.ts";
import { useGetHomePageProducts } from "@/store/react-query/useGetHomePageProducts.ts";
import HotSalesProducts from "./HotSalesProducts.tsx";
import RecentProducts from "./RecentProducts.tsx";
import SimilarProducts from "./SimilarProducts.tsx";

function HomeProductSection() {
	// prettier-ignore
	const {
		isPending,
		hotSalesProducts,
		recentlyViewedProducts,
		similarProducts,
	} = useGetHomePageProducts();

	if (isPending) {
		return <LoadingSkeleton count={10} />;
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
