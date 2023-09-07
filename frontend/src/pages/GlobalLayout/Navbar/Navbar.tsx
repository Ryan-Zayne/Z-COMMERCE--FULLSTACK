import NavHeader from './NavHeader';
import NavigationLinks from './NavigationLinks';

function Navbar() {
	return (
		<header
			id="Navbar"
			className="flex flex-wrap justify-center pt-[1rem] max-md:pb-[2rem] md:gap-[2rem]"
		>
			<NavHeader />
			<NavigationLinks />
		</header>
	);
}

export default Navbar;
