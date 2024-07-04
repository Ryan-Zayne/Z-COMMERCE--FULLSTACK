import { IconBox } from "@/components/primitives/IconBox";
import Logo from "@/components/primitives/Logo";
import DropDown from "@/components/ui/DropDown/DropDown";
import SearchForm from "@/components/ui/SearchForm";
import { useDisclosure, useToggle } from "@/lib/hooks";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { useShopStore } from "@/store/zustand/shopStore";
import { useThemeStore } from "@/store/zustand/themeStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CartDrawer from "./Cart/CartDrawer";
import HamBurgerButton from "./HamBurgerButton";
import ThemeSwitchButton from "./ThemeSwitchButton";

const NavIcons = () => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const isMobile = useGlobalStore((state) => state.isMobile);
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const [isSearchShow, toggleSearchShow] = useToggle(false);

	const cart = useShopStore((state) => state.cart);

	const cartDisclosure = useDisclosure({ hasScrollControl: true });
	const dropDownDisclosure = useDisclosure();

	useEffect(() => {
		if (!isMobile && isSearchShow) {
			toggleSearchShow(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMobile, isSearchShow]);

	return (
		<div
			id="Nav Icons and Logo"
			className="relative flex w-full select-none items-center justify-between gap-[1rem] px-[1rem]
				lg:pr-[4rem]"
		>
			<Logo className={cnJoin(isDarkMode && "brightness-[0.8] contrast-[1.8]")} />

			<SearchForm
				isSearchShow={isSearchShow}
				classNames={{
					container: cnJoin(!isMobile && "w-[min(100%,_54vw)]"),
					base: cnMerge(
						isMobile &&
							`absolute inset-x-0 top-[6.1rem] flex h-0 justify-center overflow-y-hidden
							rounded-[0_0_5px_5px] bg-body px-[2rem] transition-[height] duration-[400ms] ease-out`,
						isSearchShow && "h-[8.1rem] duration-[600ms] ease-[ease]"
					),
				}}
			/>

			<div
				id="NavIcons"
				className="flex w-[clamp(19rem,_42vw,_22rem)] items-center justify-between text-[2rem]"
			>
				{isMobile && (
					<button className="hover:text-heading active:scale-[1.25]" onClick={toggleSearchShow}>
						<IconBox icon="bx:search-alt-2" />
					</button>
				)}

				<button
					className="hover:text-heading hover:[transform:rotateY(360deg)]
						hover:[transition:transform_1000ms_ease-in-out] active:scale-[1.2] lg:text-[2.3rem]"
				>
					<Link to={"/wishlist"}>
						<IconBox icon="bx:heart" />
					</Link>
				</button>

				<DropDown.Root className={"relative flex items-center justify-center"}>
					<DropDown.Trigger asChild={true}>
						<button
							className="hover:text-heading hover:[transform:rotateY(360deg)]
								hover:[transition:transform_1000ms_ease-in-out] lg:text-[2.3rem]"
							onClick={dropDownDisclosure.onToggle}
						>
							<IconBox icon="bx:user" />
						</button>
					</DropDown.Trigger>

					<DropDown.Panel
						isOpen={dropDownDisclosure.isOpen}
						classNames={{
							panelContainer: "absolute top-[5.1rem] z-[100] w-[15rem]",
							panelList: cnJoin(
								`flex flex-col items-start gap-[1.5rem] rounded-[5px] bg-body px-[2rem]
								text-[1.3rem] [&_>_a:hover]:navlink-transition [&_>_a]:relative`,

								dropDownDisclosure.isOpen && "py-[1.5rem]"
							),
						}}
					>
						<Link to={"/auth/login"}>My Account</Link>
						<Link to={"/checkout"}>Checkout</Link>
						<Link to={"/auth/login"}>User Login</Link>
					</DropDown.Panel>
				</DropDown.Root>

				<button
					className="relative active:scale-[1.1] lg:text-[2.3rem]"
					onClick={cartDisclosure.onOpen}
				>
					<IconBox icon="bx:cart-alt" className="hover:text-heading" />

					{cart.length > 0 && (
						<span
							className="absolute right-[-1rem] top-[-0.6rem] inline-flex size-[1.7rem] items-center
								justify-center rounded-[50%] bg-secondary text-[1.2rem] font-[500]"
						>
							{cart.length}
						</span>
					)}
				</button>

				<CartDrawer
					isOpen={cartDisclosure.isOpen}
					onOpen={cartDisclosure.onOpen}
					onClose={cartDisclosure.onClose}
				/>

				<ThemeSwitchButton />

				{!isDesktop && <HamBurgerButton />}
			</div>
		</div>
	);
};

export default NavIcons;
