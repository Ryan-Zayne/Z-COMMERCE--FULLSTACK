import type { PolymorphicProps } from "@/lib/type-helpers/polymorpic-props-helper";
import { cnMerge } from "@/lib/utils/cn";
import type { CarouselContentProps, CarouselIndicatorProps, OtherCarouselProps } from "./carousel.types";
import { CarouselContextProvider } from "./carouselStoreContext";
import { useCarouselActions, useCarouselOptions, useCarouselStore } from "./hooks";

function CarouselContent<TElement extends React.ElementType = "article">(
	props: PolymorphicProps<TElement, CarouselContentProps>
) {
	const {
		as: HtmlElement = "article",
		children,
		arrowIcon,
		className = "",
		classNames = {
			innerContainer: "",
			leftBtn: "",
			rightBtn: "",
		},
		hasAutoSlide,
		autoSlideInterval,
		pauseOnHover = false,
	} = props;

	const { nextSlide, previousSlide } = useCarouselActions();

	const { setIsPauseAutoSlide } = useCarouselOptions({ hasAutoSlide, autoSlideInterval });

	return (
		<HtmlElement
			data-id="Carousel"
			className={cnMerge(`relative flex h-full touch-none select-none ${className}`)}
			onMouseEnter={() => pauseOnHover && setIsPauseAutoSlide(true)}
			onMouseLeave={() => pauseOnHover && setIsPauseAutoSlide(false)}
		>
			<button className="absolute left-0 z-40 h-full w-[9rem]" onClick={previousSlide}>
				<span
					className={cnMerge(
						"absolute left-[0.7rem] top-[45%] rotate-180 rounded-[5px] bg-carousel-btn transition-transform active:scale-[1.11]",
						classNames.leftBtn
					)}
				>
					{arrowIcon}
				</span>
			</button>

			<div
				data-id="Carousel Inner"
				className={cnMerge(
					"flex h-full w-full touch-none overflow-x-scroll scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					classNames.innerContainer
				)}
			>
				{children}
			</div>

			<button className="absolute right-0 z-40 h-full w-[9rem]" onClick={nextSlide}>
				<span
					className={cnMerge(
						"absolute right-[0.7rem] top-[45%] rounded-[5px] bg-carousel-btn transition-transform active:scale-[1.11]",
						classNames.rightBtn
					)}
				>
					{arrowIcon}
				</span>
			</button>
		</HtmlElement>
	);
}

function CarouselItem({ children, className = "" }: OtherCarouselProps) {
	return <li className={cnMerge(`flex w-full shrink-0 ${className}`)}>{children}</li>;
}

function CarouselItemWrapper({ children, className = "" }: OtherCarouselProps) {
	const currentSlide = useCarouselStore((state) => state.currentSlide);

	return (
		<ul
			data-id="Carousel Image Wrapper"
			className={cnMerge("flex w-full shrink-0 transition-transform duration-[1000ms] ease-in-out", [
				className,
			])}
			style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
		>
			{children}
		</ul>
	);
}

function CarouselCaption({ children, className = "" }: OtherCarouselProps) {
	return (
		<div data-id="Carousel Caption" className={cnMerge(`absolute text-light ${className}`)}>
			{children}
		</div>
	);
}

function CarouselIndicator({
	className = "",
	classNames = { onActive: "w-[3.5rem] rounded-[0.5rem] bg-carousel-dot" },
	index,
}: CarouselIndicatorProps) {
	const currentSlide = useCarouselStore((state) => state.currentSlide);
	const { goToSlide } = useCarouselActions();

	return (
		<button
			onClick={() => goToSlide(index)}
			className={cnMerge(
				"h-[0.6rem] w-[0.6rem] shrink-0 cursor-pointer rounded-[50%] bg-carousel-btn ease-in-out hover:bg-carousel-dot hover:[box-shadow:0_0_5px_var(--carousel-dot)]",
				className,
				index === currentSlide && classNames.onActive
			)}
		/>
	);
}

function CarouselIndicatorWrapper({ children, className = "" }: OtherCarouselProps) {
	return (
		<span
			data-id="Carousel Indicators"
			className={cnMerge(
				"absolute bottom-[2.5rem] z-[2] inline-flex w-full items-center justify-center gap-[1.5rem]",
				className
			)}
		>
			{children}
		</span>
	);
}

const Carousel = {
	Root: CarouselContextProvider,
	Content: CarouselContent,
	Item: CarouselItem,
	ItemWrapper: CarouselItemWrapper,
	Caption: CarouselCaption,
	Indicator: CarouselIndicator,
	IndicatorWrapper: CarouselIndicatorWrapper,
};

export default Carousel;
