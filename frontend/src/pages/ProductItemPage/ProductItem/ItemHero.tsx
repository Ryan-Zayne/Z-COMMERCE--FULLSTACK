import { ImageComponent } from "@/components/primitives";
import { IconBox } from "@/components/primitives/IconBox";
import { Carousel, type CarouselProviderProps } from "@/components/ui";

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
						base: "px-[0.8rem] lg:px-[2rem]",
						iconContainer: `rounded-[5px] bg-carousel-btn p-[0.8rem_0.5rem] transition-transform
						hover:box-shadow-[0_0_5px_var(--text-dark)] active:scale-[1.11] lg:p-[1.3rem_0.9rem]`,
					}}
					icon={{
						iconType: "nextIcon",
						icon: <IconBox icon="bi:chevron-right" />,
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
								base: `bg-[hsl(198,14%,14%)] hover:bg-[hsl(220,62%,31%)]
								hover:box-shadow-[0_0_5px_hsl(220,62%,31%)]`,

								onActive: "w-[0.6rem] bg-[hsl(220,62%,31%)] p-[0.4rem]",
							}}
						/>
					)}
				/>
			</Carousel.Content>
		</Carousel.Root>
	);
}

export default ItemHero;
