import type { WithChildren } from "@/lib/type-helpers/global-type-helpers";
import type { StoreApi } from "zustand";

// Carousel store types
export type CarouselStore = {
	currentSlide: number;
	maxSlide: number;
	images:
		| Array<{
				src: string;
				blurSrc?: string;
		  }>
		| string[];

	actions: {
		goToSlide: (newValue: number) => void;
		nextSlide: () => void;
		previousSlide: () => void;
	};
};

export type CarouselProviderProps = WithChildren<{
	slideImages: CarouselStore["images"];

	slideButtonSideEffect?: () => void;
}>;

export type CarouselStoreApi = StoreApi<CarouselStore>;

// Carousel component types
export type CarouselContentProps = WithChildren<{
	arrowIcon: React.ReactNode;
	className?: string;
	classNames?: {
		innerContainer?: string;
		leftBtn?: string;
		rightBtn?: string;
	};
	hasAutoSlide?: boolean;
	autoSlideInterval?: number;
	pauseOnHover?: boolean;
}>;

export type CarouselIndicatorProps = {
	className?: string;
	classNames?: {
		onActive?: string;
	};
	index: number;
};

export type OtherCarouselProps = WithChildren<{ className?: string }>;
