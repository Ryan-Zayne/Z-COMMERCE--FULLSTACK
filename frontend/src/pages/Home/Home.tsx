import { CarouselContextProvider } from '@/components/ui/Carousel/carouselStoreContext';
import Categories from './Categories/Categories';
import Hero from './Hero/Hero';
import { slideImages } from './Hero/images';
import HomeProductSection from './HomeProductSection/HomeProductSection';

function HomePage() {
	return (
		<>
			<CarouselContextProvider slideImages={slideImages}>
				<Hero />
			</CarouselContextProvider>
			<Categories />
			<HomeProductSection />
		</>
	);
}

export default HomePage;
