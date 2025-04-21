import { NavIconsHeader } from "./NavIcons/NavIconsHeader";
import { NavigationLinks } from "./NavigationLinks/NavigationLinks";

function Navbar() {
	return (
		<header
			id="Navbar"
			className="flex flex-wrap justify-center pt-[1rem] max-md:pb-[2rem] md:gap-[2rem]"
		>
			<NavIconsHeader />
			<NavigationLinks />
		</header>
	);
}

export { Navbar };
