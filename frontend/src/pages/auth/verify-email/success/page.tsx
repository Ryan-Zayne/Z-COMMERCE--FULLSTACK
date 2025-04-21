import { IconBox } from "@/components/primitives/IconBox";
import { Button } from "@/components/primitives/button";
import { Link } from "react-router";

function VerificationSuccessPage() {
	return (
		<main className="z-10 rounded-[6px] bg-body p-[3rem] md:px-[5rem]">
			<section className="flex flex-col items-center gap-6 text-center">
				<span className="flex size-[70px] items-center justify-center rounded-full bg-green-500">
					<IconBox
						icon="material-symbols:check-rounded"
						className="size-12 stroke-white stroke-[2px] text-white"
					/>
				</span>

				<div>
					<h1 className="text-[18px] font-bold">Congratulations!!!</h1>

					<p className="mt-3 text-[15px] text-white">Your email has been verified successfully.</p>
				</div>
			</section>

			<Button theme="secondary" className="mt-[60px]" asChild={true}>
				<Link to="/">Go to home</Link>
			</Button>
		</main>
	);
}

export default VerificationSuccessPage;
