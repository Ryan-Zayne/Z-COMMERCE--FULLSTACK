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

		goToSlide: (resetValue: number) => set({ currentSlide: resetValue }),

		nextSlide: () => {
			const { currentSlide, maxSlide, goToSlide } = get();

			currentSlide !== maxSlide ? goToSlide(currentSlide + 1) : goToSlide(0);
		},

		previousSlide: () => {
			const { currentSlide, maxSlide, goToSlide } = get();

			currentSlide !== 0 ? goToSlide(currentSlide - 1) : goToSlide(maxSlide);
		},
	}));

// Provider Component
function CarouselContextProvider({ children, slideImages }: CarouselProviderProps) {
	const [carouselStore] = useState(() => createCarouselStore(slideImages));

	return <Provider value={carouselStore}>{children}</Provider>;
}

// useContextStore hook
const useCarouselStore = <TState,>(callbackFn: (store: CarouselStore) => TState) => {
	const store = useContext();
	const selector = useCallbackRef(callbackFn);

	return useStore<CarouselStoreApi, TState>(store, selector);
};

export { CarouselContextProvider, useCarouselStore };
