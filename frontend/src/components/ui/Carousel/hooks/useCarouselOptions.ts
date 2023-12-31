import { useAnimationInterval } from "@/lib/hooks/index.ts";
import { useGlobalStore } from "@/store/zustand/globalStore/globalStore.ts";
import { useState } from "react";
import { useCarouselActions } from "./useCarouselStore.ts";

type CarouselOptions = {
	hasAutoSlide?: boolean;
	autoSlideInterval?: number;
};

const useCarouselOptions = (options: CarouselOptions = {}) => {
	const { hasAutoSlide = false, autoSlideInterval = 5000 } = options;
	const { nextSlide } = useCarouselActions();
	const isMobile = useGlobalStore((state) => state.isMobile);
	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const [isPauseAutoSlide, setIsPauseAutoSlide] = useState(false);

	const shouldHaveAutoSlide = hasAutoSlide && !isPauseAutoSlide && !isNavShow && !isMobile;

	useAnimationInterval({
		callbackFn: nextSlide,
		intervalDuration: shouldHaveAutoSlide ? autoSlideInterval : null,
	});

	return { setIsPauseAutoSlide };
};

export { useCarouselOptions };
