import { facebook } from "@/assets/authPageImages";
import { IconBox } from "@/components/primitives/IconBox";
import { Logo } from "@/components/primitives/Logo";
import { Button } from "@/components/primitives/button";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { AnimatePresence, m } from "motion/react";
import { Link, useLocation } from "react-router";
import { SharedForm } from "../components";

function SignUpFormPage() {
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const isSignUpPath = useLocation().pathname.endsWith("signup");

	return (
		<AnimatePresence>
			{isSignUpPath && (
				<m.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					exit={{ opacity: 0, x: 20 }}
					className="relative z-10 w-[min(100%,48rem)] rounded-[4px] bg-body p-[3rem_3rem]
						md:p-[2rem_5rem]"
				>
					<header>
						{!isDesktop && <Logo className={"ml-[-0.8rem] w-[16rem] md:w-full"} />}

						<h2
							className="font-roboto text-[3.8rem] font-[800] text-[color:hsl(0,0%,20%)]
								dark:text-[color:hsl(38,9%,76%)] max-lg:mt-[2rem]"
						>
							Sign Up
						</h2>
					</header>

					<SharedForm formVariant="signup" />

					<div className="my-[3.3rem] flex items-center">
						<span className="mr-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
						<p className="shrink-0 text-[1.5rem] text-input">Or create an account with</p>
						<span className="ml-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
					</div>

					<footer>
						<div className="flex items-center justify-center gap-[3rem] text-[1.5rem]">
							<Button
								unstyled={true}
								type="button"
								className="rounded-[50%] border-[2px] border-label bg-white p-[0.8rem]"
							>
								<IconBox icon="fa6-brands:google" className="text-[3rem]" />
							</Button>

							<Button
								unstyled={true}
								type="button"
								className={"rounded-[50%] border-[2px] border-facebook bg-facebook"}
							>
								<img className="aspect-square w-[5rem] brightness-[0.96]" src={facebook} alt="" />
							</Button>
						</div>

						<p
							className="mx-auto mt-[4rem] text-center text-[1.4rem] font-[500] text-input
								lg:mt-[3rem]"
						>
							Already have an account?
							<Link
								className="ml-[0.4rem] text-[hsl(214,89%,53%)] hover:text-[hsl(214,89%,60%)]"
								to={"/auth/signin"}
							>
								Sign in
							</Link>
						</p>
					</footer>
				</m.div>
			)}
		</AnimatePresence>
	);
}

export default SignUpFormPage;
