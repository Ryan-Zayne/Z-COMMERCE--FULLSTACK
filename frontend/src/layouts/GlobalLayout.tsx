import { Footer, Navbar, ScrollToTopButton } from "@/components/ui";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const productItemPathPattern = /^\/products\/[a-z]+\/\d+$/;

function GlobalLayout() {
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

export default GlobalLayout;
