import { useCarouselOptions } from '@/hooks/useCarouselOptions';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { twMerge } from 'tailwind-merge';
import { useCarouselStore } from './carouselStoreContext';

type CarouselProps = {
	as?: keyof JSX.IntrinsicElements;
	children: React.ReactNode;
	arrowIcon: React.ReactNode;
	onButtonClick?: () => void;
	outerClassName?: string;
	innerClassName?: string;
	leftBtnClasses?: string;
	rightBtnClasses?: string;
	isAutoSlide?: boolean;
	autoSlideInterval?: number;
	pauseOnHover?: boolean;
};

type CarouselIndicatorProps = {
	className?: string;
	onActiveClassName?: string;
	index: number;
};

type OtherCarouselProps = Pick<CarouselProps, 'children'> & {
	className?: string;
};

function Carousel(props: CarouselProps) {
	const {
		as: Element = 'article',
		children,
		arrowIcon,
		onButtonClick,
		outerClassName = '',
		innerClassName = '',
		leftBtnClasses = '',
		rightBtnClasses = '',
		isAutoSlide,
		autoSlideInterval,
		pauseOnHover = false,
	} = props;

	const isMobile = useGlobalStore((state) => state.isMobile);
	const nextSlide = useCarouselStore((state) => state.nextSlide);
	const previousSlide = useCarouselStore((state) => state.previousSlide);

	const { setIsPaused } = useCarouselOptions({
		isAutoSlide,
		autoSlideInterval,
	});

	return (
		<Element
			id="Carousel"
			className={twMerge(`relative flex h-full touch-none select-none ${outerClassName}`)}
			onMouseEnter={() => !isMobile && pauseOnHover && setIsPaused(true)}
			onMouseLeave={() => !isMobile && pauseOnHover && setIsPaused(false)}
		>
			<button className="absolute left-0 z-40 h-full w-[9rem]" onClick={() => {
				previousSlide();
				onButtonClick?.();
			}}>
				<span
					className={twMerge(
						`absolute left-[0.7rem] top-[45%] rotate-180 rounded-[5px] bg-carousel-btn transition-transform active:scale-[1.11] ${leftBtnClasses}`
					)}
				>
					{arrowIcon}
				</span>
			</button>

			<div
				id="Carousel Inner"
				className={twMerge(
					`flex h-full touch-none overflow-x-scroll scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${innerClassName}`
				)}
			>
				{children}
			</div>

			<button className="absolute right-0 z-40 h-full w-[9rem]" onClick={() => {
				nextSlide();
				onButtonClick?.();
			}}>
				<span
					className={twMerge(
						`absolute right-[0.7rem] top-[45%] rounded-[5px] bg-carousel-btn transition-transform active:scale-[1.11] ${rightBtnClasses}`
					)}
				>
					{arrowIcon}
				</span>
			</button>
		</Element>
	);
}

Carousel.Item = function CarouselItem({ children, className = '' }: OtherCarouselProps) {
	return <li className={twMerge(`flex w-full shrink-0 ${className}`)}>{children}</li>;
};

Carousel.ItemWrapper = function CarouselItemWrapper({ children, className = '' }: OtherCarouselProps) {
	const currentSlide = useCarouselStore((state) => state.currentSlide);

	return (
		<ul
			id="Carousel Image Wrapper"
			className={twMerge(
				`flex w-full shrink-0 transition-transform duration-[1000ms] ease-in-out ${className}`
			)}
			style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
		>
			{children}
		</ul>
	);
};

Carousel.Caption = function CarouselCaption({ children, className = '' }: OtherCarouselProps) {
	return (
		<div id="Carousel Caption" className={twMerge(`absolute text-light ${className}`)}>
			{children}
		</div>
	);
};

Carousel.Indicator = function CarouselIndicator({
	className = '',
	onActiveClassName = 'w-[3.5rem] rounded-[0.5rem] bg-carousel-dot',
	index,
}: CarouselIndicatorProps) {
	const currentSlide = useCarouselStore((state) => state.currentSlide);
	const goToSlide = useCarouselStore((state) => state.goToSlide);

	return (
		<span
			onClick={() => goToSlide(index)}
			className={twMerge(`
				inline-block h-[0.6rem] w-[0.6rem] shrink-0 cursor-pointer rounded-[50%] bg-carousel-btn ease-in-out hover:bg-carousel-dot hover:[box-shadow:0_0_5px_var(--carousel-dot)]
				${className}
				${index === currentSlide ? `${onActiveClassName}` : ''}
			`)}
		/>
	);
};

Carousel.IndicatorWrapper = function CarouselIndicatorWrapper({
	children,
	className = '',
}: OtherCarouselProps) {
	return (
		<span
			id="Carousel Indicators"
			className={twMerge(
				`absolute bottom-[2.5rem] z-[2] inline-flex w-full items-center justify-center gap-[1.5rem] ${className}`
			)}
		>
			{children}
		</span>
	);
};

export default Carousel;
