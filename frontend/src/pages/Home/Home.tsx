import { CarouselContextProvider } from '@/components/Carousel/carouselStoreContext';
import Categories from './Categories/Categories';
import Hero from './Hero/Hero';
import HomeProductSection from './HomeProductSection/HomeProductSection';
import images from './images';

const getGreeting = async () => {
	const res = await fetch('http://localhost:4173/api/test');
	return res.json();
};

function HomePage() {
	// const [greeting, setGreeting] = useState('');

	// useEffect(() => {
	// 	getGreeting().then((res) => setGreeting(res.greeting));
	// }, []);

	return (
		<>
			{/* <p className="absolute z-[1000] ml-[2rem]">{greeting}</p> */}
			<CarouselContextProvider slideImages={images}>
				<Hero />
			</CarouselContextProvider>
			<Categories />
			<HomeProductSection />
		</>
	);
}

export default HomePage;
