import { CarouselContextProvider } from '@/components/Carousel/carouselStoreContext';
import Categories from './Categories/Categories';
import Hero from './Hero/Hero';
import slidesImages from './Hero/images';
import HomeProductSection from './HomeProductSection/HomeProductSection';

function HomePage() {
	return (
		<>
			<CarouselContextProvider slideImages={slidesImages}>
				<Hero />
			</CarouselContextProvider>
			<Categories />
			<HomeProductSection />
		</>
	);
}

export default HomePage;
