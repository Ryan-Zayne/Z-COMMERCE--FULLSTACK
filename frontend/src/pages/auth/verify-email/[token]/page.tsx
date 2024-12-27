import { Button, IconBox } from "@/components/primitives";
import { verifyEmailQuery } from "@/store/react-query/queryFactory";
import { icons as SvgSpinnerIcons } from "@iconify-json/svg-spinners";
import { getIconData } from "@iconify/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function CheckVerificationTokenPage() {
	const { token } = useParams();

	const verifyEmailQueryResult = useQuery(verifyEmailQuery(token));

	return (
		<main
			data-pending={verifyEmailQueryResult.isPending}
			data-error={verifyEmailQueryResult.isError}
			className="group z-10 grid w-[min(100%,48rem)] place-items-center rounded-[6px] bg-body p-[3rem]
				md:px-[4rem]"
		>
			<div
				className="invisible flex flex-col items-center gap-[24px] [grid-area:1/1]
					group-data-[pending=true]:visible"
			>
				<IconBox
					icon={getIconData(SvgSpinnerIcons, "bars-scale") ?? "svg-spinners:bars-scale"}
					className="size-[4rem]"
				/>

				<p>Verifying your email, please wait...</p>
			</div>

			<section
				className="invisible flex flex-col items-center gap-[40px] text-center [grid-area:1/1]
					group-data-[error=true]:visible"
			>
				<div className="flex flex-col gap-[16px]">
					<h1 className="text-[18px] font-bold">Something went wrong</h1>

					<p className="text-[15px] text-white">
						We couldn't verify your email due to an error. You could try resending the email.
					</p>
				</div>

				<Button theme="secondary">Resend Email</Button>
			</section>
		</main>
	);
}

export default CheckVerificationTokenPage;
