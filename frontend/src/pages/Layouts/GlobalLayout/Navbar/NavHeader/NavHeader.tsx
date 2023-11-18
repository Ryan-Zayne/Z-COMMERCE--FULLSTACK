import { Logo } from '@/components/primitives/index.ts';
import { DropDown, SearchForm } from '@/components/ui/index.ts';
import { useDisclosure } from '@/hooks/index.ts';
import { useGlobalActions, useGlobalStore } from '@/store/zustand/globalStore/globalStore.ts';
import { useShopStore } from '@/store/zustand/shopStore.ts';
import { useThemeStore } from '@/store/zustand/themeStore.ts';
import { cnJoin, cnMerge } from '@/utils/cn.ts';
import { BiCartAlt, BiHeart, BiSearchAlt2, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import CartDrawer from './Cart/CartDrawer.tsx';
import HamBurgerButton from './HamBurgerButton.tsx';
import ThemeSwitchButton from './ThemeSwitchButton.tsx';

const NavHeader = () => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const isMobile = useGlobalStore((state) => state.isMobile);
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const isSearchShow = useGlobalStore((state) => state.isSearchShow);
	const { toggleSearchShow } = useGlobalActions();
	const cart = useShopStore((state) => state.cart);

	const cartDisclosure = useDisclosure({ hasScrollControl: true });
	const dropDownDisclosure = useDisclosure();

	return (
		<div
			id="Nav Icons and Logo"
			className="flex w-full select-none justify-between gap-[1rem] px-[1rem] lg:pr-[4rem] "
		>
			<Logo className={cnJoin(isDarkMode && 'contrast-[1.8]) brightness-[0.8]')} />

			<SearchForm
				className={cnMerge(
					[
						isMobile
							? 'absolute inset-x-0 top-[6.2rem] z-[10] flex h-0 w-[100%] items-center justify-center overflow-y-hidden rounded-[0_0_5px_5px] bg-body px-[2rem] transition-[height] duration-[400ms] ease-out'
							: 'w-[min(100%,_54vw)]',
					],
					[isSearchShow && 'h-[8.1rem] duration-[600ms] ease-[ease]']
				)}
			/>

			<div
				id="NavIcons Wrapper"
				className="flex w-[clamp(19rem,_42vw,_22rem)] items-center justify-between text-[2rem]"
			>
				{/* Mobile search button */}
				{isMobile && (
					<button className="hover:text-heading active:scale-[1.25]" onClick={toggleSearchShow}>
						<BiSearchAlt2 />
					</button>
				)}

				<div className="flex items-center">
					<button className="hover:text-heading hover:[transform:rotateY(360deg)] hover:[transition:transform_1000ms_ease-in-out] active:scale-[1.2] lg:text-[2.3rem]">
						<Link to={'wishlist'}>
							<BiHeart />
						</Link>
					</button>
				</div>

				<DropDown className={'relative flex items-center justify-center'}>
					<DropDown.Header className={'flex'}>
						<button
							className="hover:text-heading hover:[transform:rotateY(360deg)] hover:[transition:transform_1000ms_ease-in-out] lg:text-[2.3rem]"
							onClick={dropDownDisclosure.onToggle}
						>
							<BiUser />
						</button>
					</DropDown.Header>

					<DropDown.Panel
						isOpen={dropDownDisclosure.isOpen}
						panelParentClasses={'absolute top-[5.1rem] z-[100] w-[15rem]'}
						panelListClasses={cnJoin(
							`flex flex-col items-start gap-[1.5rem] rounded-[5px] bg-body px-[2rem] text-[1.3rem] [&_>_a:hover]:navlink-transition [&_>_a]:relative`,
							[dropDownDisclosure.isOpen && 'py-[1.5rem]']
						)}
					>
						<Link to={'/auth/login'}>My Account</Link>
						<Link to={'/'}>Checkout</Link>
						<Link to={'/auth/login'}>User Login</Link>
					</DropDown.Panel>
				</DropDown>

				<div className="flex items-center">
					<button
						className="relative active:scale-[1.1] lg:text-[2.3rem]"
						onClick={cartDisclosure.onOpen}
					>
						<BiCartAlt className="hover:text-heading" />
						{cart?.length > 0 && (
							<span className="absolute right-[-1rem] top-[-0.6rem] inline-flex h-[1.7rem] w-[1.7rem] items-center justify-center rounded-[50%] bg-secondary text-[1.2rem] font-[500]">
								{cart?.length}
							</span>
						)}
					</button>

					<CartDrawer
						isOpen={cartDisclosure.isOpen}
						onOpen={cartDisclosure.onOpen}
						onClose={cartDisclosure.onClose}
					/>
				</div>

				<ThemeSwitchButton />

				{!isDesktop && <HamBurgerButton />}
			</div>
		</div>
	);
};

export default NavHeader;
