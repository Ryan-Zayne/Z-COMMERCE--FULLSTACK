import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Footer from './Footer/Footer.tsx';
import Navbar from './Navbar/Navbar.tsx';
import ScrollToTopButton from './Navbar/ScrollToTopButton.tsx';

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
