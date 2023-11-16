import type { WithChildren } from '@/lib/global-type-helpers';
import type { StoreApi } from 'zustand';

// Carousel store types
export type CarouselStore = {
	currentSlide: number;
	slideImages:
		| Array<{
				src: string;
				blurSrc?: string;
		  }>
		| string[];
	maxSlide: number;
	isTransition: boolean;

	actions: {
		goToSlide: (resetValue: number) => void;
		setIsTranstion: (newState: boolean) => void;
		nextSlide: () => void;
		previousSlide: () => void;
	};
};

export type CarouselProviderProps = WithChildren<Pick<CarouselStore, 'slideImages'>>;

export type CarouselStoreApi = StoreApi<CarouselStore>;

// Carousel component types
export type CarouselRootProps = {
	as?: keyof JSX.IntrinsicElements;
	children: React.ReactNode;
	arrowIcon: React.ReactNode;
	onButtonClick?: () => void;
	outerClassName?: string;
	innerClassName?: string;
	leftBtnClasses?: string;
	rightBtnClasses?: string;
	hasAutoSlide?: boolean;
	autoSlideInterval?: number;
	pauseOnHover?: boolean;
};

export type CarouselIndicatorProps = {
	className?: string;
	onActiveClassName?: string;
	index: number;
};

export type OtherCarouselProps = Pick<CarouselRootProps, 'children'> & {
	className?: string;
};
