import type { SelectorFn } from "@/store/zustand/zustand-store.types";
import { useStore } from "zustand";
import type { CarouselStore } from "./carousel.types";
import { useCustomCarouselContext } from "./carouselStoreContext";

export const useCarouselStore = <TResult>(selector: SelectorFn<CarouselStore, TResult>) => {
	const store = useCustomCarouselContext();

	return useStore(store, selector);
};

export const useCarouselActions = () => useCarouselStore((state) => state.actions);
