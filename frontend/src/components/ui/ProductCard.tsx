import { Card } from "@/components/primitives/card";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import type { ProductItem } from "@/store/react-query/types";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { useShopStore } from "@/store/zustand/shopStore";
import { useThemeStore } from "@/store/zustand/themeStore";
import type { ResponseDataItemInCart } from "@/store/zustand/types";
import { useToggle } from "@zayne-labs/toolkit-react";
import { m } from "motion/react";
import { Link } from "react-router";
import { IconBox } from "../primitives/IconBox";
import { ImageComponent } from "../primitives/ImageComponent";
import { StarRating } from "../primitives/StarRating";
import { Button } from "../primitives/button";

type ProductCardProps = {
	image: string;
	link: string;
	productItem: ProductItem | ResponseDataItemInCart;
};

function ProductCard(props: ProductCardProps) {
	const { image, link = "", productItem } = props;

	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	const isMobile = useGlobalStore((state) => state.isMobile);

	const { addToCart, toggleAddToWishList } = useShopStore((state) => state.actions);

	const isProductInWishList = useShopStore((state) => state.wishList).some(
		(item) => item.id === productItem.id
	);

	const [isHearted, toggleHearted] = useToggle(isProductInWishList);

	const handleAddToCart: React.MouseEventHandler = (event) => {
		event.preventDefault();

		addToCart(productItem);
	};

	const handleAddToWishList: React.MouseEventHandler = (event) => {
		event.preventDefault();

		toggleHearted();
		toggleAddToWishList(productItem);
	};

	return (
		<m.li
			initial={{ opacity: 0, y: 200 }}
			whileInView={{
				opacity: 1,
				transition: { duration: 0.8, type: "tween" },
				y: 0,
			}}
			viewport={{ once: true }}
		>
			<Card.Root
				className={cnMerge(
					`group/card h-full w-[min(100%,26rem)] rounded-[1.2rem]
					transition-[transform,box-shadow,background-color] duration-[1000ms] ease-in-out
					hover:scale-[1.03] hover:box-shadow-[0_0_6px_0_hsl(60,_100%,_0%,_1)]`,
					[isHearted && "scale-[1.03] box-shadow-[0_0_6px_0_hsl(60,_100%,_0%,_1)]"],
					[isDarkMode && "hover:bg-primary hover:box-shadow-[0_0_6px_0px_var(--carousel-dot)]"],
					[
						isHearted
							&& isDarkMode
							&& "scale-[1.03] bg-primary [box-shadow:0_0_6px_0px_var(--carousel-dot)]",
					]
				)}
			>
				<Link to={link} className="flex size-full flex-col justify-between">
					<Card.Header
						as="div"
						className="relative h-[18rem] w-full overflow-hidden rounded-[0.8rem_0.8rem_0_0]"
					>
						<Button
							unstyled={true}
							type="button"
							onClick={handleAddToWishList}
							className={cnJoin(
								`group/btn absolute bottom-[1.1rem] right-[1.3rem] z-[100] rounded-[50%] bg-primary
								p-[0.7rem]`,

								isHearted
									? "translate-y-0 opacity-100"
									: `translate-y-[5rem] opacity-0 transition-[opacity,transform] duration-[1s]
										group-hover/card:translate-y-[0] group-hover/card:opacity-100`
							)}
						>
							{isHearted ? (
								<IconBox
									icon="ant-design:heart-filled"
									className="scale-[1.16] text-[1.9rem] text-heading
										group-active/btn:scale-[1.23]"
								/>
							) : (
								<IconBox
									icon="ant-design:heart-outlined"
									className="text-[1.9rem] text-carousel-dot group-hover/btn:text-heading
										group-active/btn:scale-[1.23]"
								/>
							)}
						</Button>

						<ImageComponent
							className={cnJoin(
								`rounded-[0.8rem_0.8rem_0_0] brightness-[0.9] transition-[transform]
								duration-[800ms] ease-in-out group-hover/card:scale-[1.17]`,
								isHearted && "scale-[1.17]"
							)}
							src={image}
							loading="lazy"
							imageType="hasSkeleton"
							onClick={(e) => isMobile && e.preventDefault()}
						/>
					</Card.Header>

					<Card.Content className="px-[1.4rem] pt-[1rem]">
						<header
							className="flex min-h-[7.2rem] items-center justify-between gap-[0.4rem] font-[600]"
						>
							<h3 className="capitalize">{productItem.title}</h3>
							<span className="text-[1.8rem]">
								<sup className="text-[1.4rem]">$</sup>+ {productItem.price}
								<sup className="text-[1.4rem]">.00</sup>
							</span>
						</header>

						<p className="mt-[0.5rem] min-h-[6rem] max-w-[30ch] text-[1.2rem]">
							{productItem.description}
						</p>
					</Card.Content>

					<Card.Footer className="p-[1.3rem_1rem_1rem]">
						<StarRating rating={productItem.rating} />
						<hr
							className={cnJoin(
								"h-[1.8px] bg-carousel-dot group-hover/card:opacity-100",
								isHearted ? "opacity-0" : "opacity-100"
							)}
						/>

						<Button
							variant="cart"
							theme="secondary"
							className="mt-[1rem] p-[0.8rem_1.3rem] text-[1.3rem] font-[500]
								active:translate-y-[0.15rem]"
							onClick={handleAddToCart}
						>
							Add to Cart
						</Button>
					</Card.Footer>
				</Link>
			</Card.Root>
		</m.li>
	);
}

export { ProductCard };
