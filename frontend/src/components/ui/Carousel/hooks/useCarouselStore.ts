import { useStore } from "zustand";
import type { CarouselStore } from "../carousel.types";
import { useCustomCarouselContext } from "../carouselStoreContext";

export const useCarouselStore = <TState>(selector: (store: CarouselStore) => TState) => {
	const store = useCustomCarouselContext();

	return useStore(store, selector);
};

export const useCarouselActions = () => useCarouselStore((state) => state.actions);
