import { useCallbackRef } from '@/lib/hooks';
import { useStore } from 'zustand';
import type { CarouselStore } from '../carousel.types';
import { useCustomCarouselContext } from '../carouselStoreContext';

export const useCarouselStore = <TState>(callbackFn: (store: CarouselStore) => TState) => {
	const store = useCustomCarouselContext();
	const selector = useCallbackRef(callbackFn);

	return useStore(store, selector);
};

export const useCarouselActions = () => useCarouselStore((state) => state.actions);
