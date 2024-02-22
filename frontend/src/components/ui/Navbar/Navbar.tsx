import NavIcons from "./NavIcons/NavIcons";
import NavigationLinks from "./NavigationLinks/NavigationLinks";

function Navbar() {
	return (
		<header
			id="Navbar"
			className="flex flex-wrap justify-center pt-[1rem] max-md:pb-[2rem] md:gap-[2rem]"
		>
			<NavIcons />
			<NavigationLinks />
		</header>
	);
}

export default Navbar;
