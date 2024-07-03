import { IconBox } from "@/components/primitives/IconBox";
import { useToggle } from "@/lib/hooks";
import type { DummyResponseDataItem } from "@/store/react-query/react-query-store.types";
import { useShopActions, useShopStore } from "@/store/zustand/shopStore";
import type { ShopStore } from "@/store/zustand/zustand-store.types";
import { Link } from "react-router-dom";

type ItemHeaderProps = {
	productItem: DummyResponseDataItem | ShopStore["cart"][number];
};

function ItemHeader({ productItem }: ItemHeaderProps) {
	const wishList = useShopStore((state) => state.wishList);
	const { toggleAddToWishList } = useShopActions();
	const isProductInWishList = wishList.some((item) => item.id === productItem.id);
	const [isHearted, toggleHearted] = useToggle(() => isProductInWishList);

	const handleHeartClick = () => {
		toggleHearted();
		toggleAddToWishList(productItem);
	};

	return (
		<>
			<button className={"text-[3rem]"}>
				<Link to={"/"}>
					<IconBox icon="typcn:arrow-back" />
				</Link>
			</button>

			<h1 className="text-center font-roboto text-[2.7rem] font-600 capitalize lg:text-[3.8rem]">
				{productItem.title}
			</h1>

			<button className="rounded-[50%] bg-primary p-[0.7rem]" onClick={handleHeartClick}>
				{isHearted ? (
					<IconBox
						icon="ant-design:heart-filled"
						className="scale-[1.16] text-[2.1rem] text-heading active:scale-[1.23]"
					/>
				) : (
					<IconBox
						icon="ant-design:heart-outlined"
						className="text-[2.1rem] text-carousel-dot hover:text-heading active:scale-[1.23]"
					/>
				)}
			</button>
		</>
	);
}
export default ItemHeader;
