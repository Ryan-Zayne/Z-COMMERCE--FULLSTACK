import { createContext } from '@/hooks/context-hook';
import { useCallbackRef } from '@/hooks/useCallbackRef';
import { useState } from 'react';
import { createStore, useStore } from 'zustand';
import type { CarouselProviderProps, CarouselStore, CarouselStoreApi } from './carousel.types';

const [Provider, useContext] = createContext<CarouselStoreApi>({
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

// hooks
const useCarouselStore = <TState,>(callbackFn: (store: CarouselStore) => TState) => {
	const store = useContext();
	const selector = useCallbackRef(callbackFn);
	const stateSlice = useStore(store, selector);

	return stateSlice;
};

const useCarouselActions = () => useCarouselStore((state) => state.actions);

export { CarouselContextProvider, useCarouselActions, useCarouselStore };
