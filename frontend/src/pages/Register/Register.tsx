import { Logo } from '@/components';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function Register() {
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const [isLogin, setIsLogin] = useState(true);

	return (
		<section className="relative flex items-center justify-center overflow-x-hidden bg-yellow-cart bg-cover bg-no-repeat md:py-[2rem] lg:justify-between lg:bg-glitter-image lg:px-[10rem]">
			<span id="Background Overlay" className="absolute inset-0 z-[1] bg-[hsl(0,0%,0%,0.45)]" />

			{isDesktop && (
				<Logo className="relative bottom-[1rem] z-10 ml-[-0.8rem] w-[20rem] brightness-[0.8] contrast-[1.7] lg:left-[4rem]" />
			)}

			<Transition
				className={
					'relative z-10 w-[min(100%,48rem)] rounded-[4px] bg-body p-[2rem_3rem] md:px-[5rem]'
				}
				show={isLogin}
				appear={true}
				enter="transition-[opacity,transform] duration-[800ms]"
				enterFrom="opacity-0 translate-x-[2rem]"
				enterTo="opacity-100 translate-x-[0]"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<LoginForm setIsLogin={setIsLogin} />
			</Transition>

			<Transition
				className={
					'relative z-10 w-[min(100%,48rem)] rounded-[4px] bg-body p-[3rem_3rem] md:p-[2rem_5rem]'
				}
				show={!isLogin}
				appear={true}
				enter="transition-[opacity,transform] duration-[800ms]"
				enterFrom="opacity-0 translate-x-[2rem]"
				enterTo="opacity-100 translate-x-[0]"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<SignUpForm setIsLogin={setIsLogin} />
			</Transition>
		</section>
	);
}

export default Register;
