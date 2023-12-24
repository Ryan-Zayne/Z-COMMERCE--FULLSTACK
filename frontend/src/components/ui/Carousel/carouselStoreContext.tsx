import { createCustomContext } from '@/lib/hooks/custom-context-hook/index.ts';
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
const createCarouselStore = ({
	slideImages,
	slideButtonSideEffect,
}: Omit<CarouselProviderProps, 'children'>) =>
	createStore<CarouselStore>((set, get) => ({
		currentSlide: 0,
		maxSlide: slideImages.length - 1,
		hasTransition: true,

		actions: {
			goToSlide: (newValue) => {
				const { setHasTransition } = get().actions;

				set({ currentSlide: newValue });
				setHasTransition(true);
				slideButtonSideEffect?.();
			},

			setHasTransition: (newValue) => {
				set({ hasTransition: newValue });
			},

			nextSlide: () => {
				const { currentSlide, maxSlide } = get();
				const { goToSlide, setHasTransition } = get().actions;

				if (currentSlide === maxSlide) {
					goToSlide(0);
					setHasTransition(false);
					return;
				}

				goToSlide(currentSlide + 1);
			},

			previousSlide: () => {
				const { currentSlide, maxSlide } = get();
				const { goToSlide, setHasTransition } = get().actions;

				if (currentSlide === 0) {
					goToSlide(maxSlide);
					setHasTransition(false);
					return;
				}

				setHasTransition(true);
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
