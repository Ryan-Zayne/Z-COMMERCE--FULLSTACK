import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import ScrollToTopButton from './Navbar/ScrollToTopButton';

function GlobalLayout() {
	return (
		<>
			<ScrollRestoration />
			<Navbar />
			<Outlet />
			<Footer />
			<ScrollToTopButton />
		</>
	);
}

export default GlobalLayout;
