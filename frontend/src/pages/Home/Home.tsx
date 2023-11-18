import Categories from './Categories/Categories.tsx';
import Hero from './Hero/Hero.tsx';
import HomeProductSection from './HomeProductSection/HomeProductSection.tsx';

function HomePage() {
	return (
		<>
			<Hero />
			<Categories />
			<HomeProductSection />
		</>
	);
}

export default HomePage;
