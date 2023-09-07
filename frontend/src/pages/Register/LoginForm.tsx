import { Button, Logo } from '@/components';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useThemeStore } from '@/store/zustand/themeStore';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { twMerge } from 'tailwind-merge';

const LoginForm = ({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) => {
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
						`font-roboto text-[3.8rem] font-[800] text-[color:hsl(0,0%,20%)] max-lg:mt-[1.5rem]`,
						isDarkMode && 'text-[color:hsl(38,9%,76%)]'
					)}
				>
					Login
				</h2>
			</header>

			<form className="mt-[3rem] flex flex-col gap-[2rem] lg:mt-[2.5rem] [&_input]:text-[1.8rem] [&_input]:text-input lg:[&_input]:text-[1.6rem] [&_label]:text-[1.2rem]">
				<label className="flex flex-col text-label">
					Email address
					<input
						type="email"
						className={twMerge(
							`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent  focus-visible:border-b-navbar`,
							isDarkMode && 'focus-visible:border-b-carousel-dot'
						)}
					/>
				</label>

				<label className="relative flex flex-col text-label">
					Password
					<input
						type={isPasswordShow ? 'text' : 'password'}
						className={twMerge(
							`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent  focus-visible:border-b-navbar`,
							isDarkMode && 'focus-visible:border-b-carousel-dot'
						)}
					/>
					<button
						className="absolute right-[2rem] top-[2.3rem] text-[1.8rem]"
						onClick={handlePasswordShow}
					>
						{isPasswordShow ? <AiFillEye /> : <AiFillEyeInvisible />}
					</button>
				</label>

				<label className="flex flex-row-reverse justify-end gap-[1rem] text-input">
					Remember me
					<input type="checkbox" />
				</label>

				<Button
					text={'Login'}
					theme={'secondary'}
					className={'mt-[1.5rem] rounded-[1rem] text-[1.7rem] font-[600]'}
				/>
			</form>

			<div className="my-[3rem] flex items-center justify-center text-input">
				<span className="mr-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
				Or
				<span className="ml-[1rem] inline-block h-[1px] w-full bg-carousel-btn" />
			</div>

			<footer>
				<div className="flex flex-col items-center text-[1.5rem]">
					<Button
						theme={'ghost'}
						className={
							'w-[max(80%,27.1rem)] gap-[1rem] rounded-[10rem] border-[2px] border-carousel-btn '
						}
					>
						<FcGoogle className="text-[1.8rem]" />
						Continue with Google
					</Button>
					<Button
						className={
							'mt-[1.5rem] w-[max(80%,27.1rem)] gap-[1rem] rounded-[10rem] border-[2px] border-carousel-btn bg-[hsl(214,89%,38%)] text-light'
						}
					>
						<FaFacebook className="text-[1.8rem]" />
						Continue with Facebook
					</Button>
				</div>

				<p className="mx-auto mt-[4rem] text-center text-[1.3rem] font-[500] text-input">
					New user?
					<button
						className="ml-[0.4rem] text-[hsl(214,89%,53%)] hover:text-[hsl(214,89%,60%)]"
						onClick={() => setIsLogin(false)}
					>
						Create an account
					</button>
				</p>
			</footer>
		</>
	);
};
export default LoginForm;
