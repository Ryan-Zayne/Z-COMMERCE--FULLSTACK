import { LoadingSkeleton } from '@/components/ui';
import { useHomePageProducts } from '@/store/react-query';
import HotSalesProducts from './HotSalesProducts';
import RecentProducts from './RecentProducts';
import SimilarProducts from './SimilarProducts';

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
