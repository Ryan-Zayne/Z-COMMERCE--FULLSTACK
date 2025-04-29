import { IconBox } from "@/components/primitives/IconBox";
import { Logo } from "@/components/primitives/Logo";
import { Button } from "@/components/primitives/button";
import { Drawer, type DrawerContentProps } from "@/components/ui/Drawer";
import { useDrawer } from "@/components/ui/Drawer/drawer-context";
import { cnJoin } from "@/lib/utils/cn";
import { useShopStore } from "@/store/zustand/shopStore";
import { useThemeStore } from "@/store/zustand/themeStore";
import { getElementList } from "@zayne-labs/ui-react/common/for";
import { Show } from "@zayne-labs/ui-react/common/show";
import { Link } from "react-router";
import { CartItem } from "./CartItem";

type CartDrawerProps = { placement?: DrawerContentProps["placement"] };

function CartDrawerAndButton(props: CartDrawerProps) {
	const { placement = "right" } = props;

	const cart = useShopStore((state) => state.cart);
	const totalPrice = useShopStore((state) => state.totalPrice);

	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	const drawer = useDrawer();

	const [CartItemsList] = getElementList();

	return (
		<>
			<Button
				unstyled={true}
				type="button"
				className="relative active:scale-[1.1]"
				onClick={drawer.onToggle}
			>
				<IconBox icon="bx:cart-alt" className="hover:text-heading lg:text-[2.3rem]" />

				{cart.length > 0 && (
					<span
						className="absolute right-[-1rem] top-[-0.6rem] inline-flex size-[1.7rem] items-center
							justify-center rounded-[50%] bg-secondary text-[1.2rem] font-[500]"
					>
						{cart.length}
					</span>
				)}
			</Button>

			<Drawer.RootProvider value={drawer}>
				<Drawer.Overlay />

				<Drawer.Content
					placement={placement}
					className="w-[min(100%,32rem)] pb-[1.6rem] lg:min-w-[40rem]"
				>
					<Drawer.CloseButton
						className="rounded-[4px] bg-heading p-[0.2rem] text-[2.6rem] text-primary lg:scale-[1.2]"
					/>

					<header
						className="mx-[1.3rem] flex items-center gap-[2rem] border-b-[1px] border-b-dark
							p-[7rem_0_2rem_2rem] lg:pl-[4.5rem]"
					>
						<Logo />

						<IconBox
							icon="mdi:cart"
							className={cnJoin("text-[4.5rem]", isDarkMode ? "text-carousel-dot" : "text-primary")}
						/>
					</header>

					<section className="px-[1.3rem] pt-[4rem] lg:px-[2rem]">
						<Show.Root when={cart.length > 0}>
							<CartItemsList
								className="flex min-h-[14rem] flex-col gap-[1rem]"
								each={cart}
								render={(item) => <CartItem key={item.title} product={item} />}
							/>

							<Show.Fallback>
								<div className="text-center italic">
									<h4 className="text-[2.8rem] font-[500]">Why here go dey empty?!</h4>
									<p className="mt-[0.7rem] text-[1.6rem]">
										Shey na window shopping you come do or abi wetin?😐
									</p>
								</div>
							</Show.Fallback>
						</Show.Root>
					</section>

					<footer className="flex flex-col gap-[3rem]">
						<p
							className="mt-[4rem] flex justify-between px-[1rem] text-[1.8rem] font-[600]
								lg:px-[2.6rem]"
						>
							Total:
							<span className="text-[2rem]">
								<sup>$</sup>
								{totalPrice}
								<sup>.00</sup>
							</span>
						</p>

						<Show.Root when={cart.length > 0}>
							<Drawer.Trigger
								as={Button}
								theme="secondary"
								className="mx-[1.3rem] text-[1.7rem] font-[600] [transition:box-shadow_300ms_ease]
									hover:box-shadow-[0_4px_20px_rgb(51,62,72,0.4)] lg:mx-[2rem]"
							>
								<Link to="/checkout">Checkout</Link>
							</Drawer.Trigger>
						</Show.Root>
					</footer>
				</Drawer.Content>
			</Drawer.RootProvider>
		</>
	);
}

export { CartDrawerAndButton };
