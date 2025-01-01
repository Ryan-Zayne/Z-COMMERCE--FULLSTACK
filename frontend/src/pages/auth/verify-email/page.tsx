import { Button, IconBox, Show } from "@/components/primitives";
import { callBackendApi } from "@/lib/api/callBackendApi";
import { useQueryClientStore } from "@/store/react-query/queryClientStore";
import { sessionQuery } from "@/store/react-query/queryFactory";
import { Timer, useTimer } from "@ark-ui/react";
import { useState } from "react";

const resendEmail = async () => {
	const sessionQueryData = await useQueryClientStore
		.getState()
		.queryClient.ensureQueryData(sessionQuery());

	void callBackendApi("/auth/resend-verification", {
		body: {
			email: sessionQueryData?.data?.user.email,
		},
		method: "POST",
	});
};

function VerifyEmailPage() {
	const [isResendEmailDisabled, setIsResendEmailDisabled] = useState(true);

	const timer = useTimer({
		autoStart: true,
		countdown: true,
		onComplete: () => setIsResendEmailDisabled(false),
		startMs: 30 * 1000,
	});

	return (
		<main
			className="z-10 flex w-[min(100%,48rem)] flex-col items-center gap-[40px] rounded-[6px] bg-body
				p-[3rem] md:px-[5rem]"
		>
			<section className="flex flex-col items-center gap-[24px] text-center">
				<span className="flex size-[70px] items-center justify-center rounded-full bg-primary">
					<IconBox icon="material-symbols:mail-rounded" className="size-12" />
				</span>

				<div className="flex flex-col gap-[12px]">
					<h1 className="text-[18px] font-bold">Check your email</h1>

					<p className="text-[15px] text-white">
						We've sent a verification link to your email address. Please check your inbox and click
						the link to verify your account.
					</p>

					<p className="mt-[8px] text-[12px] text-carousel-dot">
						Don't see the email? Check your spam folder or resend the verification email.
					</p>
				</div>
			</section>

			<section>
				<Timer.RootProvider value={timer}>
					<Button
						className="text-[13px]"
						theme="secondary"
						disabled={isResendEmailDisabled}
						onClick={() => {
							void resendEmail();
							timer.restart();
							setIsResendEmailDisabled(true);
						}}
					>
						<Show when={isResendEmailDisabled}>
							<Timer.Area className="flex items-center gap-1 text-[13px]">
								Resend in <Timer.Item type="seconds" /> seconds
							</Timer.Area>

							<Show.OtherWise>Resend Email</Show.OtherWise>
						</Show>
					</Button>
				</Timer.RootProvider>
			</section>
		</main>
	);
}

export default VerifyEmailPage;
