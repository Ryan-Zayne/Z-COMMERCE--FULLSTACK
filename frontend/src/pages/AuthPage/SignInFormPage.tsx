import { Button, Logo } from "@/components/primitives";
import { IconBox } from "@/components/primitives/IconBox";
import { cnJoin } from "@/lib/utils/cn";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { AnimatePresence, m } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import FormArea from "./components/FormArea/FormArea";

function LoginFormPage() {
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const isLoginPath = useLocation().pathname.endsWith("signin");

	return (
		<AnimatePresence>
			{isLoginPath && (
				<m.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					exit={{ opacity: 0, x: 20 }}
					className={cnJoin(
						"relative z-10 w-[min(100%,48rem)] rounded-[4px] bg-body p-[3rem_3rem] md:p-[2rem_5rem]"
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

					<FormArea classNames={{ form: "mt-[3rem]" }} formType="SignIn" />

					<div className="my-[3rem] flex items-center justify-center text-input">
						<span className="mr-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
						Or
						<span className="ml-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
					</div>

					<footer>
						<div className="flex flex-col items-center text-[1.5rem]">
							<Button
								theme={"ghost"}
								className={`w-[max(80%,27.1rem)] gap-[1rem] rounded-[10rem] border-[2px]
								border-gray-400 dark:border-carousel-btn`}
							>
								<IconBox icon="fa:google" className="text-[1.8rem]" />
								Continue with Google
							</Button>

							<Button
								className={`mt-[1.5rem] w-[max(80%,27.1rem)] gap-[1rem] rounded-[10rem]
								border-[2px] border-carousel-btn bg-[hsl(214,89%,38%)] text-light`}
							>
								<IconBox icon="fa:facebook" className="text-[1.8rem]" />
								Continue with Facebook
							</Button>
						</div>

						<p className="mx-auto mt-[4rem] text-center text-[1.3rem] font-[500] text-input">
							New user?
							<Link
								className="ml-[0.4rem] text-[hsl(214,89%,53%)] hover:text-[hsl(214,89%,60%)]"
								to={"/auth/signup"}
							>
								Create an account
							</Link>
						</p>
					</footer>
				</m.div>
			)}
		</AnimatePresence>
	);
}

export default LoginFormPage;
