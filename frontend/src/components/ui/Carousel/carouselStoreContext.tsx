import { useConstant } from "@zayne-labs/toolkit-react";
import { createZustandContext } from "@zayne-labs/toolkit-react/zustand";
import type { PrettyOmit } from "@zayne-labs/toolkit-type-helpers";
import { useEffect } from "react";
import { create } from "zustand";
import type { CarouselProviderProps, CarouselStore, ImagesType } from "./carousel.types";

const [Provider, useCarouselStore] = createZustandContext<CarouselStore>({
	hookName: "useCarouselStore",
	name: "CarouselStoreContext",
	providerName: "CarouselContextProvider",
});

// CarouselStore Creation
const createCarouselStore = <TImages extends ImagesType>(
	storeValues: PrettyOmit<CarouselProviderProps<TImages>, "children">
) => {
	const { images, onSlideBtnClick } = storeValues;

	const useInitCarouselStore = create<CarouselStore<TImages>>()((set, get) => ({
		currentSlide: 0,
		/* eslint-disable perfectionist/sort-objects */
		images,
		maxSlide: images.length - 1,

		actions: {
			/* eslint-enable perfectionist/sort-objects */

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

	return useInitCarouselStore;
};

// == Provider Component
export function CarouselContextProvider<TImages extends ImagesType>(
	props: CarouselProviderProps<TImages>
) {
	const { children, images, onSlideBtnClick } = props;

	const useInitCarouselStore = useConstant(() => createCarouselStore({ images, onSlideBtnClick }));

	// == To set images again when a page is mounted, preventing stale images from previous page
	useEffect(() => {
		useInitCarouselStore.setState({ images });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [images]);

	return <Provider value={useInitCarouselStore}>{children}</Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useCarouselStore };
