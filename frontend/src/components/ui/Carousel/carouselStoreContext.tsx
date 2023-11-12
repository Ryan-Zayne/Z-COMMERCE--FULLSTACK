import { createCustomContext } from '@/hooks/context-wrapper-hook';
import { useState } from 'react';
import { createStore } from 'zustand';
import type { CarouselProviderProps, CarouselStore, CarouselStoreApi } from './carousel.types';

const [Provider, useCustomCarouselContext] = createCustomContext<CarouselStoreApi>({
	name: 'CarouselStoreContext',
	hookName: 'useCarouselStore',
	providerName: 'CarouselContextProvider',
	defaultValue: null,
});

// CarouselStore Creation
const createCarouselStore = (slideImages: CarouselStore['slideImages']) =>
	createStore<CarouselStore>((set, get) => ({
		currentSlide: 0,
		slideImages,
		maxSlide: slideImages.length - 1,

		actions: {
			goToSlide: (value: number) => {
				set({ currentSlide: value });
			},

			nextSlide: () => {
				const { currentSlide, maxSlide } = get();
				const { goToSlide } = get().actions;

				currentSlide !== maxSlide ? goToSlide(currentSlide + 1) : goToSlide(0);
			},

			previousSlide: () => {
				const { currentSlide, maxSlide } = get();
				const { goToSlide } = get().actions;

				currentSlide !== 0 ? goToSlide(currentSlide - 1) : goToSlide(maxSlide);
			},
		},
	}));

// Provider Component
function CarouselContextProvider({ children, slideImages }: CarouselProviderProps) {
	const [carouselStore] = useState(() => createCarouselStore(slideImages));

	return <Provider value={carouselStore}>{children}</Provider>;
}

export { CarouselContextProvider, useCustomCarouselContext };
