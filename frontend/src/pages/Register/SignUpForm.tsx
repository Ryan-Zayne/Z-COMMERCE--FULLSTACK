import { Logo } from '@/components';
import type { Setter } from '@/lib/global-type-helpers';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { FcGoogle } from 'react-icons/fc';
import FormArea from './FormArea';
import { facebook } from './images';

function SignUpForm({ setIsLogin }: { setIsLogin: Setter<boolean> }) {
	const isDesktop = useGlobalStore((state) => state.isDesktop);

	return (
		<>
			<header>
				{!isDesktop && <Logo className="ml-[-0.8rem] w-[16rem] md:w-full" />}

				<h2 className="font-roboto text-[3.8rem] font-[800] text-[color:hsl(0,0%,20%)] dark:text-[color:hsl(38,9%,76%)] max-lg:mt-[2rem]">
					Sign Up
				</h2>
			</header>

			<FormArea formType={'Sign Up'} />

			<div className="my-[3.3rem] flex items-center">
				<span className="mr-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
				<p className="shrink-0 text-[1.5rem] text-input">Or create an account with</p>
				<span className="ml-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
			</div>

			<footer>
				<div className="flex items-center justify-center gap-[3rem] text-[1.5rem]">
					<button className="rounded-[50%] border-[2px] border-label bg-white p-[0.8rem]">
						<FcGoogle className="text-[3rem]" />
					</button>

					<button className={'rounded-[50%] border-[2px] border-facebook bg-facebook'}>
						<img className="aspect-square w-[5rem] brightness-[0.96]" src={facebook} alt="" />
					</button>
				</div>

				<p className="mx-auto mt-[4rem] text-center text-[1.4rem] font-[500] text-input lg:mt-[3rem]">
					Already have an account?
					<button
						className="ml-[0.4rem] text-[hsl(214,89%,53%)] hover:text-[hsl(214,89%,60%)]"
						onClick={() => setIsLogin(true)}
					>
						Sign in
					</button>
				</p>
			</footer>
		</>
	);
}
export default SignUpForm;
