import BellSvg from '@/assets/BellSvg';
import { Link, useRouteError } from 'react-router-dom';

function ErrorPage() {
	const error = useRouteError() as Error;

	return (
		<section className="fixed inset-0 flex flex-col items-center justify-center text-center">
			<BellSvg />

			<h1 className="mt-[2rem] text-[3rem]">{error.name}</h1>
			<p className="mt-[0.5rem]">{error.message}</p>

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
