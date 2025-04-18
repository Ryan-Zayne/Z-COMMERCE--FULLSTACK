import { Button } from "@/components/primitives";
import { IconBox } from "@/components/primitives/IconBox";
import Logo from "@/components/primitives/Logo";
import DropDown from "@/components/ui/DropDown/DropDown";
import SearchForm from "@/components/ui/SearchForm";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { sessionQuery } from "@/store/react-query/queryFactory";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { useShopStore } from "@/store/zustand/shopStore";
import { useThemeStore } from "@/store/zustand/themeStore";
import { useQuery } from "@tanstack/react-query";
import { useDisclosure, useToggle } from "@zayne-labs/toolkit-react";
import { useEffect } from "react";
import { Link } from "react-router";
import CartDrawer from "./Cart/CartDrawer";
import HamBurgerButton from "./HamBurgerButton";
import ThemeSwitchButton from "./ThemeSwitchButton";

const NavIcons = () => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const isMobile = useGlobalStore((state) => state.isMobile);
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const [isSearchShow, toggleSearchShow] = useToggle(false);

	const cart = useShopStore((state) => state.cart);

	const drawerCtx = useDisclosure({ hasScrollControl: true });
	const dropDownCtx = useDisclosure();

	const sessionQueryResult = useQuery(sessionQuery());

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
					base: cnMerge(
						isMobile
							&& `absolute inset-x-0 top-[6.1rem] flex h-0 justify-center overflow-y-hidden
							rounded-[0_0_5px_5px] bg-body px-[2rem] transition-[height] duration-[400ms] ease-out`,
						isSearchShow && "h-[8.1rem] duration-[600ms] ease-[ease]"
					),
					container: cnJoin(!isMobile && "w-[min(100%,_54vw)]"),
				}}
			/>

			<div
				id="NavIcons"
				className="flex w-[clamp(19rem,_42vw,_22rem)] items-center justify-between text-[2rem]"
			>
				{isMobile && (
					<Button
						unstyled={true}
						className="hover:text-heading active:scale-[1.25]"
						onClick={toggleSearchShow}
					>
						<IconBox icon="bx:search-alt-2" />
					</Button>
				)}

				<Button
					unstyled={true}
					className="hover:text-heading hover:[transform:rotateY(360deg)]
						hover:[transition:transform_1000ms_ease-in-out] active:scale-[1.2] lg:text-[2.3rem]"
				>
					<Link to={"/wishlist"}>
						<IconBox icon="bx:heart" />
					</Link>
				</Button>

				<DropDown.Root className={"relative flex items-center justify-center"}>
					<DropDown.Trigger asChild={true}>
						<Button
							unstyled={true}
							className="hover:text-heading hover:[transform:rotateY(360deg)]
								hover:[transition:transform_1000ms_ease-in-out] lg:text-[2.3rem]"
							onClick={dropDownCtx.onToggle}
						>
							<IconBox icon="bx:user" />
						</Button>
					</DropDown.Trigger>

					<DropDown.Panel
						isOpen={dropDownCtx.isOpen}
						classNames={{
							panelContainer: "absolute top-[5.1rem] z-[100] w-[15rem]",
							panelList: cnJoin(
								`flex flex-col items-start gap-[1.5rem] rounded-[5px] bg-body px-[2rem]
								text-[1.3rem] [&_>_a:hover]:navlink-transition [&_>_a]:relative`,

								dropDownCtx.isOpen && "py-[1.5rem]"
							),
						}}
					>
						{sessionQueryResult.data && <Link to="user/account">My Account</Link>}
						{cart.length > 0 && <Link to="/checkout">Checkout</Link>}
						{!sessionQueryResult.data && <Link to="/auth/signin">User Login</Link>}
					</DropDown.Panel>
				</DropDown.Root>

				<Button
					unstyled={true}
					type="button"
					className="relative active:scale-[1.1] lg:text-[2.3rem]"
					onClick={drawerCtx.onOpen}
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
				</Button>

				<CartDrawer drawerCtx={drawerCtx} />

				<ThemeSwitchButton />

				{!isDesktop && <HamBurgerButton />}
			</div>
		</div>
	);
};

export default NavIcons;
