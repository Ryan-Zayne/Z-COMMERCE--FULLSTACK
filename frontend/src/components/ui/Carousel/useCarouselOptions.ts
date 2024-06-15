import { useAnimationInterval } from "@/lib/hooks/useAnimationInterval";
import { useCallbackRef } from "@/lib/hooks/useCallbackRef";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { useState } from "react";
import { useCarouselStore } from "./carouselStoreContext";

type CarouselOptions = {
	hasAutoSlide?: boolean;
	autoSlideInterval?: number;
	shouldPauseOnHover?: boolean;
};

const useCarouselOptions = (options: CarouselOptions = {}) => {
	const { hasAutoSlide = false, autoSlideInterval = 5000, shouldPauseOnHover = false } = options;

	const isMobile = useGlobalStore((state) => state.isMobile);

	const { nextSlide } = useCarouselStore((state) => state.actions);

	const [isPaused, setIsPaused] = useState(false);

	const shouldAutoSlide = hasAutoSlide && !isPaused && !isMobile;

	useAnimationInterval({
		onAnimation: nextSlide,
		intervalDuration: shouldAutoSlide ? autoSlideInterval : null,
	});

	const pauseAutoSlide = useCallbackRef(() => shouldPauseOnHover && setIsPaused(true));

	const resumeAutoSlide = useCallbackRef(() => shouldPauseOnHover && setIsPaused(false));

	return { pauseAutoSlide, resumeAutoSlide };
};

export { useCarouselOptions };
