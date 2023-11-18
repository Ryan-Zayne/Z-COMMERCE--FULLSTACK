import { LoadingSkeleton } from '@/components/ui/index.ts';
import { useHomePageProducts } from '@/store/react-query/useHomePageProducts.ts';
import HotSalesProducts from './HotSalesProducts.tsx';
import RecentProducts from './RecentProducts.tsx';
import SimilarProducts from './SimilarProducts.tsx';

function HomeProductSection() {
	const { hotSalesProducts, recentlyViewedProducts, similarProducts, isLoading } = useHomePageProducts();

	if (isLoading) {
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
