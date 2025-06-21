import { IconBox } from "@/components/primitives/IconBox";
import { Button } from "@/components/primitives/button";
import { callBackendApi } from "@/lib/api/callBackendApi";
import { useQueryClientStore } from "@/store/react-query/queryClientStore";
import { sessionQuery } from "@/store/react-query/queryFactory";
import { Timer } from "@ark-ui/react";
import { Show } from "@zayne-labs/ui-react/common/show";
import { useState } from "react";

const resendEmail = async () => {
	const sessionQueryData = await useQueryClientStore
		.getState()
		.queryClient.ensureQueryData(sessionQuery());

	void callBackendApi("/auth/resend-verification", {
		body: {
			email: sessionQueryData.data?.user.email,
		},
		method: "POST",
	});
};

function VerifyEmailPage() {
	const [isResendEmailDisabled, setIsResendEmailDisabled] = useState(true);

	return (
		<main
			className="z-10 flex w-[min(100%,480px)] flex-col items-center gap-[40px] rounded-[6px] bg-body
				py-[30px] md:px-[200px]"
		>
			<section className="flex flex-col items-center gap-[20px] text-center">
				<span className="flex size-[70px] items-center justify-center rounded-full bg-primary">
					<IconBox icon="material-symbols:mail-rounded" className="size-12" />
				</span>

				<div className="flex flex-col gap-[15px]">
					<h1 className="text-[20px] font-bold">Check your email</h1>

					<p className="text-[25px] text-white">
						We've sent a verification link to your email address. Please check your inbox and click
						the link to verify your account.
					</p>

					<p className="mt-[8px] text-[12px] text-carousel-dot">
						Don't see the email? Check your spam folder or resend the verification email.
					</p>
				</div>
			</section>

			<section>
				<Timer.Root
					autoStart={true}
					countdown={true}
					onComplete={() => setIsResendEmailDisabled(false)}
					startMs={30 * 1000}
				>
					<Timer.Context>
						{(context) => (
							<Button
								className="text-[13px]"
								theme="secondary"
								disabled={isResendEmailDisabled}
								onClick={() => {
									void resendEmail();
									context.restart();
									setIsResendEmailDisabled(true);
								}}
							>
								<Show.Root when={isResendEmailDisabled}>
									<Timer.Area className="flex items-center gap-1 text-[13px]">
										Resend in <Timer.Item type="seconds" /> seconds
									</Timer.Area>

									<Show.Otherwise>Resend Email</Show.Otherwise>
								</Show.Root>
							</Button>
						)}
					</Timer.Context>
				</Timer.Root>
			</section>
		</main>
	);
}

export default VerifyEmailPage;
