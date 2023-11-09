import { useCarouselActions } from '@/components/Carousel/carouselStoreContext';
import { useGlobalStore } from '@/store/zustand/globalStore/globalStore';
import { useState } from 'react';
import { useAnimationInterval } from './useAnimationInterval';

type CarouselOptions = {
	hasAutoSlide?: boolean;
	autoSlideInterval?: number;
};

const useCarouselOptions = (options: CarouselOptions = {}) => {
	const { hasAutoSlide = false, autoSlideInterval = 5000 } = options;
	const isMobile = useGlobalStore((state) => state.isMobile);
	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const [isAutoSlidePaused, setIsAutoSlidePaused] = useState(false);
	const { nextSlide } = useCarouselActions();
	const shouldHaveAutoSlide = hasAutoSlide && !isAutoSlidePaused && !isNavShow && !isMobile;

	useAnimationInterval({
		callbackFn: nextSlide,
		intervalDuration: shouldHaveAutoSlide ? autoSlideInterval : null,
	});

	return { setIsAutoSlidePaused };
};

export { useCarouselOptions };
