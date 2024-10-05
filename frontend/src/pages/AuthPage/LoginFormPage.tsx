import { Button, Logo } from "@/components/primitives";
import { IconBox } from "@/components/primitives/IconBox";
import { cnJoin } from "@/lib/utils/cn";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { Link, useLocation } from "react-router-dom";
import FormArea from "./components/FormArea/FormArea";

function LoginFormPage() {
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const isLoginPath = useLocation().pathname.endsWith("login");

	return (
		<div
			className={cnJoin(
				`relative z-10 w-[min(100%,48rem)] rounded-[4px] bg-body p-[3rem_3rem]
				transition-[opacity,transform] duration-[800ms] md:p-[2rem_5rem]`
				// isVisible ? "translate-x-[0] opacity-100" : "translate-x-[2rem] opacity-0"
			)}
		>
			<header>
				{!isDesktop && <Logo className={"ml-[-0.8rem] w-[16rem] md:w-full"} />}

				<h2
					className={`font-roboto text-[3.8rem] font-[800] text-[color:hsl(0,0%,20%)]
						dark:text-[color:hsl(38,9%,76%)] max-lg:mt-[1.5rem]`}
				>
					Login
				</h2>
			</header>

			<FormArea formClasses={"mt-[3rem]"} formType={"Login"} />

			<div className="my-[3rem] flex items-center justify-center text-input">
				<span className="mr-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
				Or
				<span className="ml-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
			</div>

			<footer>
				<div className="flex flex-col items-center text-[1.5rem]">
					<Button
						theme={"ghost"}
						className={`w-[max(80%,27.1rem)] gap-[1rem] rounded-[10rem] border-[2px] border-gray-400
							dark:border-carousel-btn`}
					>
						<IconBox icon="fa:google" className="text-[1.8rem]" />
						Continue with Google
					</Button>

					<Button
						className={`mt-[1.5rem] w-[max(80%,27.1rem)] gap-[1rem] rounded-[10rem] border-[2px]
							border-carousel-btn bg-[hsl(214,89%,38%)] text-light`}
					>
						<IconBox icon="fa:facebook" className="text-[1.8rem]" />
						Continue with Facebook
					</Button>
				</div>

				<p className="mx-auto mt-[4rem] text-center text-[1.3rem] font-[500] text-input">
					New user?
					<Link
						className="ml-[0.4rem] text-[hsl(214,89%,53%)] hover:text-[hsl(214,89%,60%)]"
						to={"/auth/sign-up"}
					>
						Create an account
					</Link>
				</p>
			</footer>
		</div>
	);
}

export default LoginFormPage;
