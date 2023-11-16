import { useGlobalStore } from '@/store/zustand/globalStore/globalStore';
import { cnMerge } from '@/utils/cn';
import type { CarouselIndicatorProps, CarouselRootProps, OtherCarouselProps } from '..';
import { useCarouselActions, useCarouselOptions, useCarouselStore } from './hooks';

function CarouselRoot(props: CarouselRootProps) {
	const {
		as: Element = 'article',
		children,
		arrowIcon,
		onButtonClick,
		outerClassName = '',
		innerClassName = '',
		leftBtnClasses = '',
		rightBtnClasses = '',
		hasAutoSlide,
		autoSlideInterval,
		pauseOnHover = false,
	} = props;

	const isMobile = useGlobalStore((state) => state.isMobile);

	const { nextSlide, previousSlide } = useCarouselActions();

	const { setIsAutoSlidePaused } = useCarouselOptions({ hasAutoSlide, autoSlideInterval });

	return (
		<Element
			id="Carousel"
			className={cnMerge(`relative flex h-full touch-none select-none ${outerClassName}`)}
			onMouseEnter={() => !isMobile && pauseOnHover && setIsAutoSlidePaused(true)}
			onMouseLeave={() => !isMobile && pauseOnHover && setIsAutoSlidePaused(false)}
		>
			<button
				className="absolute left-0 z-40 h-full w-[9rem]"
				onClick={() => {
					previousSlide();
					onButtonClick?.();
				}}
			>
				<span
					className={cnMerge(
						`absolute left-[0.7rem] top-[45%] rotate-180 rounded-[5px] bg-carousel-btn transition-transform active:scale-[1.11] ${leftBtnClasses}`
					)}
				>
					{arrowIcon}
				</span>
			</button>

			<div
				id="Carousel Inner"
				className={cnMerge(
					`flex h-full touch-none overflow-x-scroll scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${innerClassName}`
				)}
			>
				{children}
			</div>

			<button
				className="absolute right-0 z-40 h-full w-[9rem]"
				onClick={() => {
					nextSlide();
					onButtonClick?.();
				}}
			>
				<span
					className={cnMerge(
						`absolute right-[0.7rem] top-[45%] rounded-[5px] bg-carousel-btn transition-transform active:scale-[1.11] ${rightBtnClasses}`
					)}
				>
					{arrowIcon}
				</span>
			</button>
		</Element>
	);
}

function CarouselItem({ children, className = '' }: OtherCarouselProps) {
	return <li className={cnMerge(`flex w-full shrink-0 ${className}`)}>{children}</li>;
}

function CarouselItemWrapper({ children, className = '' }: OtherCarouselProps) {
	const currentSlide = useCarouselStore((state) => state.currentSlide);
	const hasTransition = useCarouselStore((state) => state.isTransition);

	return (
		<ul
			id="Carousel Image Wrapper"
			className={cnMerge(
				'flex w-full shrink-0 transition-transform duration-[1000ms] ease-in-out',
				[!hasTransition && 'transition-none'],
				[className]
			)}
			style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
		>
			{children}
		</ul>
	);
}

function CarouselCaption({ children, className = '' }: OtherCarouselProps) {
	return (
		<div id="Carousel Caption" className={cnMerge(`absolute text-light ${className}`)}>
			{children}
		</div>
	);
}

function CarouselIndicator({
	className = '',
	onActiveClassName = 'w-[3.5rem] rounded-[0.5rem] bg-carousel-dot',
	index,
}: CarouselIndicatorProps) {
	const currentSlide = useCarouselStore((state) => state.currentSlide);
	const { goToSlide } = useCarouselActions();

	return (
		<span
			onClick={() => goToSlide(index)}
			className={cnMerge(`
				inline-block h-[0.6rem] w-[0.6rem] shrink-0 cursor-pointer rounded-[50%] bg-carousel-btn ease-in-out hover:bg-carousel-dot hover:[box-shadow:0_0_5px_var(--carousel-dot)]
				${className}
				${index === currentSlide ? `${onActiveClassName}` : ''}
			`)}
		/>
	);
}

function CarouselIndicatorWrapper({ children, className = '' }: OtherCarouselProps) {
	return (
		<span
			id="Carousel Indicators"
			className={cnMerge(
				`absolute bottom-[2.5rem] z-[2] inline-flex w-full items-center justify-center gap-[1.5rem] ${className}`
			)}
		>
			{children}
		</span>
	);
}

const Carousel = {
	Root: CarouselRoot,
	Item: CarouselItem,
	ItemWrapper: CarouselItemWrapper,
	Caption: CarouselCaption,
	Indicator: CarouselIndicator,
	IndicatorWrapper: CarouselIndicatorWrapper,
};

export default Carousel;
