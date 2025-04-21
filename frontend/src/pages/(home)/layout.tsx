import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import { Outlet, ScrollRestoration, useLocation } from "react-router";

function HomeLayout() {
	const href = useLocation().pathname;

	const withoutFooter = href.startsWith("/products") || href.startsWith("/user");

	return (
		<>
			<ScrollRestoration />
			<ScrollToTopButton />
			<Navbar />
			<Outlet />
			{!withoutFooter && <Footer />}
		</>
	);
}

export default HomeLayout;
