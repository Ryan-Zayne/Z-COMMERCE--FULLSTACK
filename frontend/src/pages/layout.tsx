import { Footer, Navbar, ScrollToTopButton } from "@/components/ui";
import { Outlet, ScrollRestoration, useLocation } from "react-router";

const productItemPathPattern = /^\/products\/[a-z]+\/\d+$/;

function RootLayout() {
	const href = useLocation().pathname;
	const isProductItemPage = productItemPathPattern.test(href);

	return (
		<>
			<ScrollRestoration />
			<ScrollToTopButton />
			<Navbar />
			<Outlet />
			{!isProductItemPage && <Footer />}
		</>
	);
}

export default RootLayout;
