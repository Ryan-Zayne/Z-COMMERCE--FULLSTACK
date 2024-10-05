import { facebook } from "@/assets/authPageImages";
import { Logo } from "@/components/primitives";
import { IconBox } from "@/components/primitives/IconBox";
import { cnJoin } from "@/lib/utils/cn";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { Link, useLocation } from "react-router-dom";
import FormArea from "./components/FormArea/FormArea";
import { usePresence } from "./usePresence/usePresence";

function SignUpFormPage() {
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const isSignUpPath = useLocation().pathname.endsWith("sign-up");

	const { elementRef, isPresent, isVisible } = usePresence<HTMLDivElement>({
		reactiveValue: isSignUpPath,
	});

	return (
		isPresent && (
			<div
				ref={elementRef}
				className={cnJoin(
					`relative z-10 w-[min(100%,48rem)] rounded-[4px] bg-body p-[3rem_3rem]
					transition-[opacity,transform] duration-[800ms] md:p-[2rem_5rem]`,
					isVisible ? "translate-x-[0] opacity-100" : "translate-x-[2rem] opacity-0"
				)}
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

				<FormArea formType={"Sign Up"} />

				<div className="my-[3.3rem] flex items-center">
					<span className="mr-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
					<p className="shrink-0 text-[1.5rem] text-input">Or create an account with</p>
					<span className="ml-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
				</div>

				<footer>
					<div className="flex items-center justify-center gap-[3rem] text-[1.5rem]">
						<button
							type="button"
							className="rounded-[50%] border-[2px] border-label bg-white p-[0.8rem]"
						>
							<IconBox icon="fa6-brands:google" className="text-[3rem]" />
						</button>

						<button
							type="button"
							className={"rounded-[50%] border-[2px] border-facebook bg-facebook"}
						>
							<img className="aspect-square w-[5rem] brightness-[0.96]" src={facebook} alt="" />
						</button>
					</div>

					<p className="mx-auto mt-[4rem] text-center text-[1.4rem] font-[500] text-input lg:mt-[3rem]">
						Already have an account?
						<Link
							className="ml-[0.4rem] text-[hsl(214,89%,53%)] hover:text-[hsl(214,89%,60%)]"
							to={"/auth/login"}
						>
							Sign in
						</Link>
					</p>
				</footer>
			</div>
		)
	);
}

export default SignUpFormPage;
