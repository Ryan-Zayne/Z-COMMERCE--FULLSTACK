import type { EachProp, ForRenderProps } from "@/components/primitives/For";
import type { Prettify } from "@/lib/type-helpers/global-type-helpers";
import type { StoreApi } from "zustand";

// Carousel store types
export type ImagesType = Array<Record<string, string>> | string[];

export type CarouselStore<TImages extends ImagesType = ImagesType> = {
	currentSlide: number;
	maxSlide: number;
	images: TImages;

	actions: {
		goToSlide: (newValue: number) => void;
		nextSlide: () => void;
		previousSlide: () => void;
	};
};

export type CarouselStoreApi<TImages extends ImagesType = ImagesType> = StoreApi<CarouselStore<TImages>>;

export type CarouselProviderProps<TImages extends ImagesType = ImagesType> = {
	children: React.ReactNode;
	images: CarouselStore<TImages>["images"];
	onSlideBtnClick?: () => void;
};

// Carousel component types
export type CarouselContentProps = {
	children: React.ReactNode;

	classNames?: {
		base?: string;
		scrollContainer?: string;
	};

	hasAutoSlide?: boolean;
	autoSlideInterval?: number;
	shouldPauseOnHover?: boolean;
};

export type CarouselButtonsProps = {
	type: "prev" | "next";

	classNames?: {
		base?: string;
		iconContainer?: string;
		defaultIcon?: string;
	};

	icon?: React.ReactNode;
};

export type CarouselControlProps = {
	classNames?: {
		base?: string;
		defaultIcon?: string;
		iconContainer?: string;
	};

	// == Allow for custom icons, either passing both or just one of the two
	icon?:
		| {
				iconType?: null;
				prev?: React.ReactNode;
				next?: React.ReactNode;
		  }
		| {
				iconType: "prevIcon" | "nextIcon";
				icon?: React.ReactNode;
		  };
};

export type CarouselIndicatorProps = {
	classNames?: {
		base?: string;
		onActive?: string;
	};
	currentIndex: number;
};

type BaseWrapperProps<TArrayItem> = Prettify<ForRenderProps<TArrayItem> & Partial<EachProp<TArrayItem>>>;

export type CarouselWrapperProps<TArrayItem> = BaseWrapperProps<TArrayItem> & {
	className?: string;
};

export type OtherCarouselProps = {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
};
