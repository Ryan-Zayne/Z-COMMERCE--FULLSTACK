import { Button } from "@/components/primitives";
import { IconBox } from "@/components/primitives/IconBox";
import StarRating from "@/components/primitives/StarRating";
import type { DummyResponseDataItem } from "@/store/react-query/react-query-store.types";
import { useShopActions, useShopStore } from "@/store/zustand/shopStore";
import { Link } from "react-router-dom";

type ItemDescriptionProps = {
	productItem: DummyResponseDataItem;
};

function ItemDescription({ productItem }: ItemDescriptionProps) {
	const productItemInCart = useShopStore((state) => state.cart).find(
		(item) => item.id === productItem.id
	);
	const { addToCart, decrementProductQuantity } = useShopActions();

	const productQuantityChosen = productItemInCart?.quantity ?? 0;
	const quantityLeftInStock = productItem.stock - productQuantityChosen;

	const handlePlus = () => addToCart(productItem);

	const handleMinus = () => decrementProductQuantity(productItem.id);

	return (
		<article
			className="mt-[2.5rem] flex max-w-[46rem] flex-col max-md:mx-auto md:mt-0 lg:gap-[2rem]
				lg:pb-[0.5rem]"
		>
			<div className="flex items-center justify-between lg:w-[90%]">
				<div>
					<h2 className="text-[2.5rem] font-[600] lg:text-[3.4rem]">{productItem.brand}</h2>
					<StarRating
						className="mt-[0.4rem] text-[1.6rem]"
						rating={productItem.rating}
						text={"reviews"}
					/>
				</div>
				<p className="text-[2.3rem] font-[500] lg:text-[3rem]">
					<sup>$</sup>
					{productItem.price}
					<sup>.00</sup>
				</p>
			</div>

			<div className="mt-[2rem]">
				<h2 className="text-[2.5rem] font-[600] lg:text-[3.4rem]">Description</h2>
				<p className="mt-[0.4rem] text-[1.5rem] font-[300] lg:text-[1.55rem]">
					{productItem.description}
				</p>
			</div>

			<div className="mt-[3.5rem] flex items-center gap-[4rem] md:mt-[4.5rem] lg:gap-[6rem]">
				<div
					className="flex w-[14rem] items-center justify-between rounded-[4rem] bg-carousel-btn
						p-[0.6rem_1.1rem] text-[2.3rem] font-[600] md:w-[17rem] md:text-[2.6rem]"
				>
					<button
						className="active:scale-[1.2] disabled:brightness-[0.5] disabled:active:transform-none"
						disabled={productQuantityChosen === 0}
						onClick={handleMinus}
					>
						<IconBox icon="mdi:minus-circle" />
					</button>

					<p className="font-roboto">{productQuantityChosen}</p>

					<button
						className="active:scale-[1.2] disabled:brightness-[0.5] disabled:active:transform-none"
						disabled={productQuantityChosen === productItem.stock}
						onClick={handlePlus}
					>
						<IconBox icon="mdi:plus-circle" />
					</button>
				</div>

				<div className="whitespace-nowrap">
					<p className="text-[1.4rem] font-[300] tracking-wide md:text-[1.7rem]">
						Only
						<span
							className="inline-block min-w-[3.8rem] text-center text-[1.8rem] font-[500]
								text-[hsl(43,67%,50%)]"
						>
							{quantityLeftInStock}
						</span>
						Items Left
					</p>
					<span className="font-[500]">{`Don't miss it`}!</span>
				</div>
			</div>

			<div className="mt-[4rem] flex gap-[3rem] font-[500] md:mt-auto md:justify-between">
				<Button
					theme={"secondary"}
					variant={"shop"}
					className={`w-[15rem] p-[1rem_0] transition-[transform] duration-[200ms] ease-in-out
						[box-shadow:0_0_0_1.3px_var(--color-secondary)] hover:scale-[1.1] hover:bg-heading
						hover:text-primary hover:box-shadow-[0_0_0_1.3px_var(--color-secondary)]
						active:scale-[1.1] lg:w-[20rem]`}
				>
					<Link to={"/checkout"}>Buy Now</Link>
				</Button>

				<Button
					theme={"ghost"}
					variant={"shop"}
					className={`w-[15rem] p-[1rem_0] transition-[transform] duration-[200ms] ease-in-out
						[box-shadow:0_0_0_1.3px_var(--color-primary)] hover:scale-[1.1] hover:bg-heading
						hover:text-primary hover:box-shadow-[0_0_0_1.3px_var(--color-secondary)]
						active:scale-[1.17] lg:w-[20rem]`}
					onClick={handlePlus}
				>
					<IconBox icon="mdi:cart-outline" className="mr-[1rem] text-[2rem]" />
					<p>Add to Cart</p>
				</Button>
			</div>
		</article>
	);
}
export default ItemDescription;
