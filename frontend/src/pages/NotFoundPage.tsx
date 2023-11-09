import BellSvg from '@/assets/BellSvg';
import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<section className="fixed inset-0 flex flex-col items-center justify-center text-center">
			<BellSvg />

			<h1 className="mt-8">Page Not Found</h1>

			<Link
				className="navlink-transition relative mt-6 inline-flex items-center border-b border-dotted border-dark font-medium text-heading hover:border-black/0"
				to={'/'}
			>
				Back to Home
			</Link>
		</section>
	);
}

export default NotFoundPage;
