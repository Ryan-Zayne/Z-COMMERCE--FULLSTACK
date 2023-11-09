import { cnMerge } from '@/lib/utils/cn';
import { useGlobalActions, useGlobalStore } from '@/store/zustand/globalStore/globalStore';
import { RiCloseFill, RiMenu3Fill } from 'react-icons/ri';

function HamBurgerButton() {
	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const { toggleNavShow } = useGlobalActions();

	return (
		<>
			<button
				id="Hamburger"
				className={cnMerge(
					`z-[120] w-[2.6rem]`,
					isNavShow && 'fixed right-[1.9rem] animate-[bounce_1.5s_ease_infinite] text-rose-600'
				)}
				onClick={toggleNavShow}
			>
				{isNavShow ? <RiCloseFill className="text-[3rem]" /> : <RiMenu3Fill />}
			</button>

			{/* HAMBURGER OVERLAY */}
			<div
				onClick={toggleNavShow}
				className={cnMerge(
					`fixed z-[80] w-0 bg-[hsl(0,0%,0%,0.6)] [inset:0_0_0_auto]`,
					isNavShow && 'w-screen'
				)}
			/>
		</>
	);
}
export default HamBurgerButton;
