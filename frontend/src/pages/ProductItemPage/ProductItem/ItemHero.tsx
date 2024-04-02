import { ImageComponent } from "@/components/primitives";
import { Carousel, type CarouselProviderProps } from "@/components/ui";
import { BsChevronRight } from "react-icons/bs";

type ItemHeroProps = {
	slideImages: Extract<CarouselProviderProps["images"], string[]>;
};

function ItemHero({ slideImages }: ItemHeroProps) {
	return (
		<Carousel.Root images={slideImages}>
			<Carousel.Content
				as="div"
				classNames={{
					base: "h-[35rem] w-[min(100%,50rem)] max-md:mx-auto md:h-full",
					scrollContainer: "rounded-[0.7rem] dark:box-shadow-[0_0_7px_-1px_hsl(0,0%,40%,0.6)]",
				}}
			>
				<Carousel.Controls
					classNames={{
						base: "md:px-[0.8rem] lg:px-[2rem]",
						iconContainer:
							"rounded-[5px] bg-carousel-btn transition-transform active:scale-[1.11] hover:box-shadow-[0_0_5px_var(--text-dark)] p-[0.8rem_0.5rem] lg:p-[1.3rem_0.9rem]",
					}}
					icon={{
						iconType: "rightIcon",
						icon: <BsChevronRight />,
					}}
				/>

				<Carousel.ItemWrapper<(typeof slideImages)[number]>
					className={"brightness-[0.65]"}
					render={(image) => (
						<Carousel.Item key={image}>
							<ImageComponent imageType={"hasSkeleton"} src={image} />
						</Carousel.Item>
					)}
				/>

				<Carousel.IndicatorWrapper<(typeof slideImages)[number]>
					render={(image, index) => (
						<Carousel.Indicator
							key={image}
							currentIndex={index}
							classNames={{
								base: "bg-[hsl(198,14%,14%)] hover:bg-[hsl(220,62%,31%)] hover:box-shadow-[0_0_5px_hsl(220,62%,31%)]",
								onActive: "p-[0.4rem] w-[0.6rem] bg-[hsl(220,62%,31%)]",
							}}
						/>
					)}
				/>
			</Carousel.Content>
		</Carousel.Root>
	);
}

export default ItemHero;
