import Button from '@/components/primitives/Button.tsx';
import Logo from '@/components/primitives/Logo.tsx';
import Drawer from '@/components/ui/Drawer/Drawer.tsx';
import type { DrawerContentProps, DrawerStore } from '@/components/ui/Drawer/drawer.types';
import { useElementList } from '@/hooks/index.ts';
import { useShopStore } from '@/store/zustand/shopStore.ts';
import { useThemeStore } from '@/store/zustand/themeStore.ts';
import { IoMdCart } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { CartItem, CartItemWrapper } from './CartItem.tsx';

type CartDrawerProps = DrawerStore & { placement?: DrawerContentProps['placement'] };

function CartDrawer(props: CartDrawerProps) {
	const { isOpen, onClose, onOpen, placement = 'right' } = props;

	const cart = useShopStore((state) => state.cart);
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const { For: CartItemsList } = useElementList();
	const totalPrice = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);

	return (
		<Drawer.Root {...{ isOpen, onClose, onOpen }}>
			<Drawer.Overlay />

			<Drawer.Content
				placement={placement}
				className={'w-[min(100%,28rem)] pb-[1.6rem] lg:min-w-[40rem]'}
			>
				<Drawer.CloseButton
					className={'rounded-[4px] bg-heading p-[0.2rem] text-[2.6rem] text-primary lg:scale-[1.2]'}
				/>

				<Drawer.Header
					className={
						'mx-[1.3rem] flex items-center gap-[2rem] border-b-[1px] border-b-dark p-[7rem_0_2rem_2rem] lg:pl-[4.5rem]'
					}
				>
					<Logo />

					<IoMdCart
						className={`text-[4.5rem] ${isDarkMode ? 'text-carousel-dot' : 'text-primary'}`}
					/>
				</Drawer.Header>

				<Drawer.Body className={'px-[1.3rem] pt-[4rem] lg:px-[2rem]'}>
					<ul className="flex min-h-[14rem] flex-col gap-[1rem]">
						<CartItemWrapper showCartItems={cart?.length !== 0}>
							<CartItemsList
								each={cart}
								render={(item) => <CartItem key={item.title} product={item} />}
							/>
						</CartItemWrapper>
					</ul>

					<div className="mt-[4rem] px-[1rem] lg:px-[2.6rem]">
						<p className="flex justify-between text-[1.8rem] font-[600]">
							Total:
							<span className="text-[2rem]">
								<sup>$</sup>
								{totalPrice}
								<sup>.00</sup>
							</span>
						</p>
					</div>
				</Drawer.Body>

				<Drawer.Footer className={'px-[1.3rem] pt-[3rem] lg:px-[2rem]'}>
					<Button
						theme={'secondary'}
						className={
							'w-full text-[1.7rem] font-[600] [transition:box-shadow_300ms_ease] hover:box-shadow-[0_4px_20px_rgb(51,62,72,0.4)]'
						}
					>
						<Link to={'checkout'}>Checkout</Link>
					</Button>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	);
}

export default CartDrawer;
