import { useBaseElementList } from "@/lib/hooks";
import type { MyCustomCss } from "@/lib/type-helpers/global-type-helpers";
import type { PolymorphicProps } from "@/lib/type-helpers/polymorpism-helper";
import { cnMerge } from "@/lib/utils/cn";
import { LuChevronLeftCircle } from "react-icons/lu";
import type {
	CarouselButtonsProps,
	CarouselContentProps,
	CarouselControlProps,
	CarouselIndicatorProps,
	CarouselIndicatorWrapperProps,
	CarouselItemWrapperProps,
	OtherCarouselProps,
} from "./carousel.types";
import { CarouselContextProvider, useCarouselStore } from "./carouselStoreContext";
import { useCarouselOptions } from "./useCarouselOptions";

// TODO -  Add dragging and swiping support
function CarouselContent<TElement extends React.ElementType = "article">(
	props: PolymorphicProps<TElement, CarouselContentProps>
) {
	const {
		as: HtmlElement = "article",
		children,
		classNames = {},
		hasAutoSlide,
		autoSlideInterval,
		shouldPauseOnHover,
	} = props;

	const { pauseAutoSlide, resumeAutoSlide } = useCarouselOptions({
		hasAutoSlide,
		autoSlideInterval,
		shouldPauseOnHover,
	});

	return (
		<HtmlElement
			data-id="Carousel"
			className={cnMerge("relative touch-none select-none", classNames.base)}
			onMouseEnter={pauseAutoSlide}
			onMouseLeave={resumeAutoSlide}
		>
			<div
				data-id="Scroll Container"
				className={cnMerge(
					"flex size-full touch-none overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					classNames.scrollContainer
				)}
			>
				{children}
			</div>
		</HtmlElement>
	);
}

function CarouselButton(props: CarouselButtonsProps) {
	const { type, icon, classNames = {} } = props;

	const nextOrPreviousSlide = useCarouselStore((state) =>
		type === "prev" ? state.actions.previousSlide : state.actions.nextSlide
	);

	const DefaultIcon = LuChevronLeftCircle;

	return (
		<button
			className={cnMerge(
				"z-[30] flex h-full w-[15%] items-center",
				type === "prev" ? "justify-start" : "justify-end",
				classNames.base
			)}
			onClick={nextOrPreviousSlide}
		>
			<span className={cnMerge("transition-transform active:scale-[1.06]", classNames.iconContainer)}>
				{icon ?? (
					<DefaultIcon className={cnMerge(type === "next" && "rotate-180", classNames.defaultIcon)} />
				)}
			</span>
		</button>
	);
}

function CarouselControls(props: CarouselControlProps) {
	const { classNames, icon } = props;

	return (
		<div className={cnMerge("absolute inset-0 flex justify-between", classNames?.base)}>
			<CarouselButton
				type="prev"
				classNames={{
					defaultIcon: classNames?.defaultIcon,
					iconContainer: classNames?.iconContainer,
				}}
				icon={icon?.prev}
			/>

			<CarouselButton
				type="next"
				classNames={{
					defaultIcon: classNames?.defaultIcon,
					iconContainer: classNames?.iconContainer,
				}}
				icon={icon?.next}
			/>
		</div>
	);
}

function CarouselItemWrapper<TArrayItem>(props: CarouselItemWrapperProps<TArrayItem>) {
	const { each, children, render, className } = props;

	const [ItemList] = useBaseElementList();
	const currentSlide = useCarouselStore((state) => state.currentSlide);
	const images = useCarouselStore((state) => each ?? (state.images as TArrayItem[]));

	return (
		<ul
			data-id="Carousel Image Wrapper"
			className={cnMerge(
				"flex w-full shrink-0 snap-center [transform:translate3d(var(--translate-distance),0,0)] [transition:transform_800ms_ease]",
				className
			)}
			style={
				{
					"--translate-distance": `-${currentSlide * 100}%`,
				} satisfies MyCustomCss as MyCustomCss
			}
		>
			{typeof render === "function" ? (
				<ItemList each={images} render={render} />
			) : (
				<ItemList each={images}>{children}</ItemList>
			)}
		</ul>
	);
}

function CarouselItem({ children, className, ...restOfProps }: OtherCarouselProps) {
	return (
		<li
			className={cnMerge("flex w-full shrink-0 snap-center justify-center", className)}
			{...restOfProps}
		>
			{children}
		</li>
	);
}

function CarouselCaption<TElement extends React.ElementType = "div">(
	props: PolymorphicProps<TElement, OtherCarouselProps>
) {
	const { as: HtmlElement = "div", children, className } = props;

	return (
		<HtmlElement data-id="Carousel Caption" className={cnMerge("absolute z-[10]", className)}>
			{children}
		</HtmlElement>
	);
}

function CarouselIndicatorWrapper<TArrayItem>(props: CarouselIndicatorWrapperProps<TArrayItem>) {
	const { each, children, render, classNames = {} } = props;

	const images = useCarouselStore((state) => each ?? (state.images as TArrayItem[]));
	const [IndicatorList] = useBaseElementList();

	return (
		<div
			data-id="Carousel Indicators"
			className={cnMerge(
				"absolute bottom-[2.5rem] z-[2] flex w-full items-center justify-center gap-[1.5rem]",
				classNames.base
			)}
		>
			<ul className={cnMerge("flex items-center justify-center gap-4", classNames.indicatorContainer)}>
				{typeof render === "function" ? (
					<IndicatorList each={images} render={render} />
				) : (
					<IndicatorList each={images}>{children}</IndicatorList>
				)}
			</ul>
		</div>
	);
}

function CarouselIndicator(props: CarouselIndicatorProps) {
	const { classNames = {}, currentIndex } = props;

	const {
		currentSlide,
		actions: { goToSlide },
	} = useCarouselStore((state) => state);

	return (
		<li>
			<button
				onClick={() => goToSlide(currentIndex)}
				className={cnMerge(
					"size-[6px] shrink-0 rounded-[50%] bg-carousel-btn ease-in-out hover:bg-carousel-dot hover:[box-shadow:0_0_5px_var(--carousel-dot)]",
					classNames.base,
					currentIndex === currentSlide && [
						"w-[3.5rem] rounded-[0.5rem] bg-carousel-dot",
						classNames.onActive,
					]
				)}
			/>
		</li>
	);
}

const Carousel = {
	Root: CarouselContextProvider,
	Content: CarouselContent,
	Controls: CarouselControls,
	Item: CarouselItem,
	ItemWrapper: CarouselItemWrapper,
	Caption: CarouselCaption,
	Indicator: CarouselIndicator,
	IndicatorWrapper: CarouselIndicatorWrapper,
};

export default Carousel;
