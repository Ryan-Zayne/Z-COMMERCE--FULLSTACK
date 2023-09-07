import { CarouselContextProvider } from '@/components/Carousel/carouselStoreContext';
import Categories from './Categories/Categories';
import Hero from './Hero/Hero';
import HomeProductSection from './HomeProductSection/HomeProductSection';
import images from './images';

function HomePage() {
	return (
		<>
			<CarouselContextProvider slideImages={images}>
				<Hero />
			</CarouselContextProvider>
			<Categories />
			<HomeProductSection />
		</>
	);
}

export default HomePage;
