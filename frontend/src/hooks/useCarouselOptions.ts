import { useCarouselStore } from '@/components/Carousel/carouselStoreContext';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useState } from 'react';
import { useAnimationInterval } from './useAnimationInterval';

type CarouselOptions = {
	isAutoSlide?: boolean;
	autoSlideInterval?: number;
};

const useCarouselOptions = (options: CarouselOptions = {}) => {
	const { isAutoSlide = false, autoSlideInterval = 10000 } = options;

	const [isPaused, setIsPaused] = useState(false);
	const isMobile = useGlobalStore((state) => state.isMobile);
	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const nextSlide = useCarouselStore((state) => state.nextSlide);

	// AutoSlide functionality for a given slideInterval
	useAnimationInterval(
		nextSlide,
		isAutoSlide && !isPaused && !isNavShow && !isMobile ? autoSlideInterval : null
	);

	return { setIsPaused };
};

export { useCarouselOptions };
