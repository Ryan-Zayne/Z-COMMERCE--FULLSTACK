import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import ScrollToTopButton from './Navbar/ScrollToTopButton';

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
