import { createCustomContext, useInitialize } from "@/lib/hooks";
import type { PrettyOmit, SelectorFn } from "@/lib/type-helpers/global-type-helpers";
import { useEffect } from "react";
import { createStore, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { CarouselProviderProps, CarouselStore, CarouselStoreApi, ImagesType } from "./carousel.types";

const [Provider, useCarouselContext] = createCustomContext<CarouselStoreApi>({
	name: "CarouselStoreContext",
	hookName: "useCarouselStore",
	providerName: "CarouselContextProvider",
});

// CarouselStore Creation
const createCarouselStore = <TImages extends ImagesType>(
	storeValues: PrettyOmit<CarouselProviderProps<TImages>, "children">
) => {
	const { images, onSlideBtnClick } = storeValues;

	const carouselStore = createStore<CarouselStore<TImages>>((set, get) => ({
		images,
		currentSlide: 0,
		maxSlide: images.length - 1,

		actions: {
			goToSlide: (newValue) => {
				onSlideBtnClick?.();

				set({ currentSlide: newValue });
			},

			nextSlide: () => {
				const { currentSlide, maxSlide } = get();
				const { goToSlide } = get().actions;

				if (currentSlide === maxSlide) {
					goToSlide(0);
					return;
				}

				goToSlide(currentSlide + 1);
			},

			previousSlide: () => {
				const { currentSlide, maxSlide } = get();
				const { goToSlide } = get().actions;

				if (currentSlide === 0) {
					goToSlide(maxSlide);
					return;
				}

				goToSlide(currentSlide - 1);
			},
		},
	}));

	return carouselStore;
};

// == Provider Component
export function CarouselContextProvider<TImages extends ImagesType>(
	props: CarouselProviderProps<TImages>
) {
	const { children, images, onSlideBtnClick } = props;

	const carouselStore = useInitialize(() => createCarouselStore({ images, onSlideBtnClick }));

	// == To set images again when a page is mounted, preventing stale images from previous page
	useEffect(() => {
		carouselStore.setState({ images });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [images]);

	return <Provider value={carouselStore}>{children}</Provider>;
}

// Store Hook
export const useCarouselStore = <TResult,>(selector: SelectorFn<CarouselStore, TResult>) => {
	const store = useCarouselContext();

	return useStore(store, useShallow(selector));
};
