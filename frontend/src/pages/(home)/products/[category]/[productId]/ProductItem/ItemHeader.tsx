import { useToggle } from "@zayne-labs/toolkit-react";
import { Link } from "react-router";
import { Button } from "@/components/primitives/button";
import { IconBox } from "@/components/primitives/IconBox";
import type { ProductItemSchemaType } from "@/store/react-query/types";
import { useShopStore } from "@/store/zustand/shopStore";
import type { ShopStore } from "@/store/zustand/types";

type ItemHeaderProps = {
	productItem: ProductItemSchemaType | ShopStore["cart"][number];
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
			<Button unstyled={true} className={"text-[30px]"}>
				<Link to={"/"}>
					<IconBox icon="typcn:arrow-back" />
				</Link>
			</Button>

			<h1 className="text-center font-roboto text-[27px] font-semibold capitalize lg:text-[38px]">
				{productItem.title}
			</h1>

			<Button
				unstyled={true}
				className="flex size-[40px] items-center justify-center rounded-[50%] bg-primary"
				onClick={handleHeartClick}
			>
				{isHearted ?
					<IconBox
						icon="ant-design:heart-filled"
						className="size-[2.10px] text-heading active:scale-[1.23]"
					/>
				:	<IconBox
						icon="ant-design:heart-outlined"
						className="size-[2.10px] text-carousel-dot hover:text-heading active:scale-[1.23]"
					/>
				}
			</Button>
		</>
	);
}
export default ItemHeader;
