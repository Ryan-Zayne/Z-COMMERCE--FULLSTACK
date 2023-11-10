import BellSvg from '@/assets/BellSvg';
import { Link, useRouteError } from 'react-router-dom';

function ErrorPage() {
	const error = useRouteError() as Error;
	console.log(error);

	return (
		<section className="fixed inset-0 flex flex-col items-center justify-center text-center">
			<BellSvg />

			<h1 className="mt-8">{error.message}</h1>

			<Link
				to={'/'}
				className="navlink-transition relative mt-6 inline-flex items-center border-b border-dotted border-dark font-medium text-heading hover:border-black/0"
			>
				Back to Home
			</Link>
		</section>
	);
}

export default ErrorPage;
