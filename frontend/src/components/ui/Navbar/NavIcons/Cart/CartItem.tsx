import { IconBox } from "@/components/primitives/IconBox";
import { useShopActions } from "@/store/zustand/shopStore";
import { useThemeStore } from "@/store/zustand/themeStore";
import type { ShopStore } from "@/store/zustand/zustand-store.types";

type CartItemProps = {
	product: ShopStore["cart"][number];
};

function CartItem({ product }: CartItemProps) {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const { removeProductFromCart } = useShopActions();

	const handleRemoveProduct = () => removeProductFromCart(product.id);

	return (
		<li
			className={`flex items-center rounded-[5px] p-[1rem] lg:p-[1.6rem] ${
				isDarkMode
					? "box-shadow-[0_1px_10px_hsl(0,0%,0%,0.6)]"
					: "box-shadow-[0_2px_6px_hsl(0,0%,0%,0.3)]"
				}`}
		>
			<img
				className="aspect-square w-[5rem] rounded-[50%] lg:w-[7rem]"
				src={product.thumbnail}
				alt=""
			/>

			<div className="ml-[1rem] flex flex-col gap-[0.3rem] text-[1.3rem] lg:ml-[1.6rem] lg:text-[1.5rem]">
				<h4 className="font-roboto font-600 lg:text-[1.7rem]">{product.title}</h4>
				<p className="font-500 text-[hsl(0,0%,50%,0.7)]">${product.price}</p>
				<p>
					Quantity: <span className="ml-[0.2rem] text-secondary">{product.quantity}</span>
				</p>
			</div>

			<button
				className="ml-auto text-[1.8rem] text-rose-500 hover:text-rose-400 active:scale-[1.1]
					lg:text-[2.3rem]"
				onClick={handleRemoveProduct}
			>
				<IconBox icon="tabler:trash-filled" />
			</button>
		</li>
	);
}

export default CartItem;
