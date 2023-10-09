import { useMediaQueryActions } from '@/store/zustand/globalStore';
import { desktopQuery, mobileQuery, tabletQuery } from '@/utils/constants';
import { useEffect } from 'react';
import { useThrottleByFrame } from './useThrottleCallback';

const useMediaQuery = () => {
	const { setIsMobile, setIsTablet, setIsDesktop } = useMediaQueryActions();
	const throttledSetIsMobile = useThrottleByFrame(setIsMobile);
	const throttledSetIsTablet = useThrottleByFrame(setIsTablet);
	const throttledSetIsDesktop = useThrottleByFrame(setIsDesktop);

	useEffect(() => {
		mobileQuery.addEventListener('change', throttledSetIsMobile);
		tabletQuery.addEventListener('change', throttledSetIsTablet);
		desktopQuery.addEventListener('change', throttledSetIsDesktop);

		return () => {
			mobileQuery.removeEventListener('change', throttledSetIsMobile);
			tabletQuery.removeEventListener('change', throttledSetIsTablet);
			desktopQuery.removeEventListener('change', throttledSetIsDesktop);
		};
	}, [throttledSetIsDesktop, throttledSetIsMobile, throttledSetIsTablet]);
};

export { useMediaQuery };

