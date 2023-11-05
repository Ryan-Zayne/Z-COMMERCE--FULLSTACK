import { useToggle } from '@/hooks';
import type { ResponseDataItem } from '@/store/react-query/react-query-store.types';
import { useShopActions, useShopStore } from '@/store/zustand/shopStore';
import type { ShopStore } from '@/store/zustand/zustand-store.types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';

type ItemHeaderProps = {
	productItem: ResponseDataItem | ShopStore['cart'][number];
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
			<button className={'text-[3rem]'}>
				<Link to={'/'}>
					<TiArrowBack />
				</Link>
			</button>

			<h1 className="text-center font-roboto text-[2.7rem] font-600 capitalize lg:text-[3.8rem]">
				{productItem.title}
			</h1>

			<button className="rounded-[50%] bg-primary p-[0.7rem]" onClick={handleHeartClick}>
				{isHearted ? (
					<AiFillHeart className="scale-[1.16] text-[2.1rem] text-heading active:scale-[1.23]" />
				) : (
					<AiOutlineHeart className="text-[2.1rem] text-carousel-dot hover:text-heading active:scale-[1.23]" />
				)}
			</button>
		</>
	);
}
export default ItemHeader;
