import { IconBox } from "@/components/primitives/IconBox";
import { Button } from "@/components/primitives/button";
import type { ProductItem } from "@/store/react-query/types";
import { useShopStore } from "@/store/zustand/shopStore";
import type { ShopStore } from "@/store/zustand/types";
import { useToggle } from "@zayne-labs/toolkit-react";
import { Link } from "react-router";

type ItemHeaderProps = {
	productItem: ProductItem | ShopStore["cart"][number];
};

function ItemHeader({ productItem }: ItemHeaderProps) {
	const wishList = useShopStore((state) => state.wishList);
	const { toggleAddToWishList } = useShopStore((state) => state.actions);
	const isProductInWishList = wishList.some((item) => item.id === productItem.id);
	const [isHearted, toggleHearted] = useToggle(() => isProductInWishList);

	const handleHeartClick = () => {
		toggleHearted();
		toggleAddToWishList(productItem);
	};

	return (
		<>
			<Button unstyled={true} className={"text-[3rem]"}>
				<Link to={"/"}>
					<IconBox icon="typcn:arrow-back" />
				</Link>
			</Button>

			<h1 className="text-center font-roboto text-[2.7rem] font-600 capitalize lg:text-[3.8rem]">
				{productItem.title}
			</h1>

			<Button
				unstyled={true}
				className="flex size-[4rem] items-center justify-center rounded-[50%] bg-primary"
				onClick={handleHeartClick}
			>
				{isHearted ? (
					<IconBox
						icon="ant-design:heart-filled"
						className="size-[2.1rem] text-heading active:scale-[1.23]"
					/>
				) : (
					<IconBox
						icon="ant-design:heart-outlined"
						className="size-[2.1rem] text-carousel-dot hover:text-heading active:scale-[1.23]"
					/>
				)}
			</Button>
		</>
	);
}
export default ItemHeader;
