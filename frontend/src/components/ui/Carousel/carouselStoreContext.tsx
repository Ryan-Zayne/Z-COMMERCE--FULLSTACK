import { createCustomContext } from '@/hooks/custom-context-hook/index.ts';
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
		isTransition: true,

		actions: {
			goToSlide: (value: number) => {
				const { setIsTranstion } = get().actions;

				set({ currentSlide: value });
				setIsTranstion(true);
			},

			setIsTranstion: (newState: boolean) => {
				set({ isTransition: newState });
			},

			nextSlide: () => {
				const { currentSlide, maxSlide } = get();
				const { goToSlide, setIsTranstion } = get().actions;

				if (currentSlide === maxSlide) {
					goToSlide(0);
					setIsTranstion(false);
					return;
				}

				goToSlide(currentSlide + 1);
			},

			previousSlide: () => {
				const { currentSlide, maxSlide } = get();
				const { goToSlide, setIsTranstion } = get().actions;

				if (currentSlide === 0) {
					goToSlide(maxSlide);
					setIsTranstion(false);
					return;
				}

				goToSlide(currentSlide - 1);
			},
		},
	}));

// Provider Component
function CarouselContextProvider({ children, slideImages }: CarouselProviderProps) {
	const [carouselStore] = useState(() => createCarouselStore(slideImages));

	return <Provider value={carouselStore}>{children}</Provider>;
}

export { CarouselContextProvider, useCustomCarouselContext };
