import type { WithChildren } from '@/lib/types/global-type-helpers';
import type { StoreApi } from 'zustand';

// Carousel store types
export type CarouselStore = {
	currentSlide: number;
	maxSlide: number;
	hasTransition: boolean;

	actions: {
		goToSlide: (newValue: number) => void;
		nextSlide: () => void;
		previousSlide: () => void;
		setHasTransition: (newValue: boolean) => void;
	};
};

export type CarouselProviderProps = WithChildren<{
	slideImages:
		| Array<{
				src: string;
				blurSrc?: string;
		  }>
		| string[];
	slideButtonSideEffect?: () => void;
}>;

export type CarouselStoreApi = StoreApi<CarouselStore>;

// Carousel component types
export type CarouselContentProps = WithChildren<{
	as?: keyof JSX.IntrinsicElements;
	arrowIcon: React.ReactNode;
	onButtonClick?: () => void;
	outerClassName?: string;
	innerClassName?: string;
	leftBtnClasses?: string;
	rightBtnClasses?: string;
	hasAutoSlide?: boolean;
	autoSlideInterval?: number;
	pauseOnHover?: boolean;
}>;

export type CarouselIndicatorProps = {
	className?: string;
	onActiveClassName?: string;
	index: number;
};

export type OtherCarouselProps = Pick<CarouselContentProps, 'children'> & {
	className?: string;
};
