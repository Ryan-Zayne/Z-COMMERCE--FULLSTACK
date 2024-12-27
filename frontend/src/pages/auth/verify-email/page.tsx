import { Button, IconBox } from "@/components/primitives";

function VerifyEmailPage() {
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
						Don't see the email? Check your spam folder
					</p>
				</div>
			</section>

			<Button theme="secondary">Resend Email</Button>
		</main>
	);
}

export default VerifyEmailPage;
