import { Link } from 'react-router-dom';

function PageNotFound() {
	return (
		<section className="fixed inset-0 flex flex-col items-center justify-center text-center">
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="0"
				viewBox="0 0 24 24"
				className="drop-shadow-glow animate-flicker text-yellow-300"
				height="60"
				width="60"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<path fill="none" d="M0 0h24v24H0z" />
					<path d="M4 20v-6a8 8 0 1 1 16 0v6h1v2H3v-2h1zm2-6h2a4 4 0 0 1 4-4V8a6 6 0 0 0-6 6zm5-12h2v3h-2V2zm8.778 2.808l1.414 1.414-2.12 2.121-1.415-1.414 2.121-2.121zM2.808 6.222l1.414-1.414 2.121 2.12L4.93 8.344 2.808 6.222z" />
				</g>
			</svg>

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

export default PageNotFound;
