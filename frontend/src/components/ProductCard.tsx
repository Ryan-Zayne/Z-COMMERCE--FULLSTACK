import type { ResponseDataItem } from '@/store/react-query/query-hook.types';
import type { ShopStore } from '@/store/zustand/zustand-store.types';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useGlobalStore } from '../store/zustand/globalStore';
import { useShopActions, useShopStore } from '../store/zustand/shopStore';
import { useThemeStore } from '../store/zustand/themeStore';
import Button from './Button';
import Card from './Card/Card';
import ImageComponent from './ImageComponent';
import StarRating from './StarRating';

type ProductCardProps = {
	to: string;
	image: string;
	product: ResponseDataItem | ShopStore['cart'][number];
	aosAnimation?: string;
	aosDuration?: string;
	aosEasing?: string;
};

function ProductCard(props: ProductCardProps) {
	const {
		to = '',
		image,
		product,
		aosAnimation = 'zoom-in',
		aosDuration = '500',
		aosEasing = 'ease-in-out',
	} = props;

	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const isMobile = useGlobalStore((state) => state.isMobile);
	const wishList = useShopStore((state) => state.wishList);
	const { addToCart, toggleAddToWishList } = useShopActions();
	const isProductInWishList = wishList.some((item) => item.id === product.id);
	const [isHearted, setIsHearted] = useState(() => isProductInWishList);

	const handleAddToCart: React.MouseEventHandler = (event) => {
		event.preventDefault();
		addToCart(product);
	};

	const handleAddToWishList: React.MouseEventHandler = (event) => {
		event.preventDefault();
		setIsHearted((prev) => !prev);
		toggleAddToWishList(product);
	};

	return (
		<Card
			as={'li'}
			{...{ aosAnimation, aosDuration, aosEasing }}
			className={twMerge(
				`group/card w-[min(100%,25rem)] rounded-[1.2rem] transition-[transform,box-shadow,background-color] duration-[1000ms] ease-in-out hover:scale-[1.03] hover:box-shadow-[0_0_6px_0_hsl(60,_100%,_0%,_1)]`,

				[isHearted && 'scale-[1.03] box-shadow-[0_0_6px_0_hsl(60,_100%,_0%,_1)]'],
				[isDarkMode && 'hover:bg-primary hover:box-shadow-[0_0_6px_0px_var(--carousel-dot)]'],
				[
					isHearted &&
						isDarkMode &&
						'scale-[1.03] bg-primary [box-shadow:0_0_6px_0px_var(--carousel-dot)]',
				]
			)}
		>
			<Link className="flex h-full w-full flex-col justify-between" to={to}>
				<Card.Header
					as="div"
					className="relative h-[18rem] w-full overflow-hidden rounded-[0.8rem_0.8rem_0_0]"
				>
					<button
						className={twMerge(
							`group/btn absolute bottom-[1.1rem] right-[1.3rem] z-[100] rounded-[50%] bg-primary p-[0.7rem]`,
							[
								isHearted
									? 'translate-y-0 opacity-100'
									: 'translate-y-[5rem] opacity-0 transition-[opacity,transform] duration-[1s] group-hover/card:translate-y-[0] group-hover/card:opacity-100',
							]
						)}
						onClick={handleAddToWishList}
					>
						{isHearted ? (
							<AiFillHeart className="scale-[1.16] text-[1.9rem] text-heading group-active/btn:scale-[1.23]" />
						) : (
							<AiOutlineHeart className="text-[1.9rem] text-carousel-dot group-hover/btn:text-heading group-active/btn:scale-[1.23]" />
						)}
					</button>

					<ImageComponent
						className={twMerge(
							`rounded-[0.8rem_0.8rem_0_0] brightness-[0.9] transition-[transform] duration-[800ms] ease-in-out group-hover/card:scale-[1.17]`,
							[isHearted && 'scale-[1.17]']
						)}
						src={image}
						loading="lazy"
						isDynamicImage={true}
						onClick={(e) => isMobile && e.preventDefault()}
					/>
				</Card.Header>

				<Card.Body className="px-[1.4rem] pt-[1rem]">
					<header className="flex min-h-[7.2rem] items-center justify-between gap-[0.4rem] font-[600]">
						<h3 className="capitalize">{product.title}</h3>
						<span className="text-[1.8rem]">
							<sup className="text-[1.4rem]">$</sup>
							{product.price}
							<sup className="text-[1.4rem]">.00</sup>
						</span>
					</header>

					<p className="mt-[0.5rem] min-h-[6rem] max-w-[30ch] text-[1.2rem]">{product.description}</p>

					<StarRating rating={product.rating} />
				</Card.Body>

				<Card.Footer className="p-[1.3rem_1rem_1rem]">
					<hr
						className={twMerge(`h-[1.8px] bg-carousel-dot opacity-0 group-hover/card:opacity-100`, [
							isHearted && 'opacity-100',
						])}
					/>

					<Button
						variant={'cart'}
						theme={'secondary'}
						text={'Add to Cart'}
						className={
							'mt-[1rem] p-[0.8rem_1.3rem] text-[1.3rem] font-[500] active:translate-y-[0.15rem]'
						}
						onClick={handleAddToCart}
					/>
				</Card.Footer>
			</Link>
		</Card>
	);
}

export default ProductCard;
