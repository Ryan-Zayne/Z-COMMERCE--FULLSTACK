import { Button, Logo } from '@/components';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useThemeStore } from '@/store/zustand/themeStore';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { twMerge } from 'tailwind-merge';
import facebook from './images/facebook.png';

function SignUpForm({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const [isPasswordShow, setIsPasswordShow] = useState(false);

	const handlePasswordShow: React.MouseEventHandler = (event) => {
		event.preventDefault();
		setIsPasswordShow((prev) => !prev);
	};

	return (
		<>
			<header>
				{!isDesktop && <Logo className="ml-[-0.8rem] w-[16rem] md:w-full" />}

				<h2
					className={twMerge(
						`font-roboto text-[3.8rem] font-[800] text-[color:hsl(0,0%,20%)] max-lg:mt-[2rem]`,
						isDarkMode && 'text-[color:hsl(38,9%,76%)]'
					)}
				>
					Sign Up
				</h2>
			</header>

			<form className="mt-[2.5rem] flex flex-col gap-[1.8rem] [&_input]:text-[1.8rem] lg:[&_input]:text-[1.6rem] [&_label]:text-[1.2rem]">
				<label className="flex flex-col text-label">
					Name
					<input
						type="text"
						className={twMerge(
							`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar`,
							isDarkMode && 'focus-visible:border-b-carousel-dot'
						)}
					/>
				</label>

				<label className="flex flex-col text-label">
					Email address
					<input
						type="email"
						className={twMerge(
							`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar`,
							isDarkMode && 'focus-visible:border-b-carousel-dot'
						)}
					/>
				</label>

				<label className="relative flex flex-col text-label">
					Password
					<input
						type={isPasswordShow ? 'text' : 'password'}
						className={twMerge(
							`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar`,
							isDarkMode && 'focus-visible:border-b-carousel-dot'
						)}
					/>
					<button
						className="absolute right-[2rem] top-[2.3rem] text-[1.8rem]"
						onClick={handlePasswordShow}
					>
						{isPasswordShow ? <AiFillEyeInvisible /> : <AiFillEye />}
					</button>
				</label>

				<div className="flex flex-row-reverse justify-end gap-[1rem] text-input">
					<p className="text-[1.4rem]">
						I agree to all{' '}
						<span className="cursor-default font-[500] underline hover:text-[hsl(214,89%,53%)]">
							Terms & Conditions
						</span>
					</p>
					<input type="checkbox" />
				</div>

				<Button
					text={'Sign up'}
					theme={'secondary'}
					className={'mt-[1.5rem] rounded-[1rem] text-[1.7rem] font-[600]'}
				/>
			</form>

			<div className="my-[3.3rem] flex items-center ">
				<span className="mr-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
				<p className="shrink-0 text-[1.5rem] text-input">Or create an account with</p>
				<span className="ml-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
			</div>

			<footer>
				<div className="flex items-center justify-center gap-[3rem] text-[1.5rem]">
					<button className="rounded-[50%] border-[2px] border-label bg-white p-[0.8rem]">
						<FcGoogle className="text-[3rem]" />
					</button>

					<button
						className={twMerge(
							'rounded-[50%] border-[2px] border-[hsl(214,89%,53%)] bg-[hsl(214,89%,53%)] ',
							isDarkMode && 'border-[hsl(214,89%,35%)] bg-[hsl(214,89%,35%)]'
						)}
					>
						<img className="aspect-square w-[5rem] brightness-[0.96]" src={facebook} alt="" />
					</button>
				</div>

				<p className="mx-auto mt-[4rem] text-center text-[1.4rem] font-[500] text-input lg:mt-[3rem]">
					Already have an account?
					<button
						className="ml-[0.4rem] text-[hsl(214,89%,53%)] hover:text-[hsl(214,89%,60%)]"
						onClick={() => {
							setIsLogin(true);
						}}
					>
						Sign in
					</button>
				</p>
			</footer>
		</>
	);
}
export default SignUpForm;
