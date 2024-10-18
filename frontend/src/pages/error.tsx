import BellSvg from "@/assets/BellSvg";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
	const error = useRouteError() as Error;

	return (
		<section className="fixed inset-0 flex flex-col items-center justify-center text-center">
			<BellSvg />

			<h1 className="mt-[2rem] text-[3rem]">{error.name}</h1>
			<p className="mt-[1rem] italic">{error.message}</p>
		</section>
	);
}

export default ErrorPage;
