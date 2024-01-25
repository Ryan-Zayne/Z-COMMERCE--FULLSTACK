import { createCustomContext } from "@/lib/hooks/custom-context-hook";
import { useState } from "react";
import { createStore } from "zustand";
import type { CarouselProviderProps, CarouselStore, CarouselStoreApi } from "./carousel.types";

const [Provider, useCustomCarouselContext] = createCustomContext<CarouselStoreApi>({
	name: "CarouselStoreContext",
	hookName: "useCarouselStore",
	providerName: "CarouselContextProvider",
});

// CarouselStore Creation
const createCarouselStore = ({
	slideImages,
	slideButtonSideEffect,
}: Omit<CarouselProviderProps, "children">) =>
	createStore<CarouselStore>((set, get) => ({
		currentSlide: 0,
		maxSlide: slideImages.length - 1,

		actions: {
			goToSlide: (newValue) => {
				slideButtonSideEffect?.();

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

// Provider Component
function CarouselContextProvider({ children, slideImages, slideButtonSideEffect }: CarouselProviderProps) {
	const [carouselStore] = useState(() => createCarouselStore({ slideImages, slideButtonSideEffect }));

	return <Provider value={carouselStore}>{children}</Provider>;
}
export { CarouselContextProvider, useCustomCarouselContext };
