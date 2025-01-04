import { BarScaleIcon } from "@/components/icons";
import { Button, IconBox } from "@/components/primitives";
import { verifyEmailQuery } from "@/store/react-query/queryFactory";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router";

function CheckVerificationTokenPage() {
	const { token } = useParams();

	const [tokenValue, setTokenValue] = useState<string | undefined>("");

	const verifyEmailQueryResult = useQuery(verifyEmailQuery(tokenValue));

	return (
		<main
			data-idle={
				verifyEmailQueryResult.fetchStatus === "idle" && verifyEmailQueryResult.status !== "error"
			}
			data-pending={
				verifyEmailQueryResult.status === "pending" && verifyEmailQueryResult.fetchStatus !== "idle"
			}
			data-error={verifyEmailQueryResult.status === "error"}
			className="group z-10 grid w-[min(100%,48rem)] place-items-center rounded-[6px] bg-body p-[3rem]
				md:px-[4rem]"
		>
			<section
				className="invisible flex flex-col items-center gap-[24px] text-center [grid-area:1/1]
					group-data-[idle=true]:visible"
			>
				<span className="flex size-[70px] items-center justify-center rounded-full bg-primary">
					<IconBox icon="material-symbols:mark-email-unread-rounded" className="size-12" />
				</span>

				<div className="flex flex-col gap-[12px]">
					<h1 className="text-[18px] font-bold">Verify Your Email</h1>
					<p className="text-[15px] text-white">
						Click the button below to verify your email address and activate your account
					</p>
				</div>

				<Button theme="secondary" onClick={() => setTokenValue(token)}>
					Verify Email
				</Button>
			</section>

			<section
				className="invisible flex flex-col items-center gap-[24px] [grid-area:1/1]
					group-data-[pending=true]:visible"
			>
				<BarScaleIcon className="size-[4rem]" />

				<p>Verifying your email, please wait...</p>
			</section>

			<section
				className="invisible flex flex-col items-center gap-[24px] text-center [grid-area:1/1]
					group-data-[error=true]:visible"
			>
				<span className="flex size-[70px] items-center justify-center rounded-full bg-red-500/20">
					<IconBox icon="material-symbols:error-rounded" className="size-12 text-red-500" />
				</span>

				<div className="flex flex-col gap-[12px]">
					<p className="text-[15px] font-semibold text-white">
						We couldn't verify your email due to{" "}
						{verifyEmailQueryResult.error?.message ?? "an error"}
					</p>

					<p className="mt-[6px] text-[12px] text-carousel-dot">
						Please try again or request a new verification email
					</p>
				</div>

				<Button theme="secondary" asChild={true}>
					<Link to="/auth/verify-email">Try Again</Link>
				</Button>
			</section>
		</main>
	);
}

export default CheckVerificationTokenPage;
