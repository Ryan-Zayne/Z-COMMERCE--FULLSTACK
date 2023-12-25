import type { WithChildren } from '@/lib/types/global-type-helpers';
import type { StoreApi } from 'zustand';

// Carousel store types
export type CarouselStore = {
	currentSlide: number;
	maxSlide: number;

	actions: {
		goToSlide: (newValue: number) => void;
		nextSlide: () => void;
		previousSlide: () => void;
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
	arrowIcon: React.ReactNode;
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

export type OtherCarouselProps = WithChildren<{ className?: string }>;
