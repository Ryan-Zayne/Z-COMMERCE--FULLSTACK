import { desktopQuery, mobileQuery, tabletQuery } from "@/lib/utils/constants.ts";
import { useMediaQueryActions } from "@/store/zustand/globalStore/globalStore.ts";
import { useLayoutEffect } from "react";

const useMediaQuery = () => {
	const { setIsMobile, setIsTablet, setIsDesktop } = useMediaQueryActions();

	// prettier-ignore
	useLayoutEffect(
		function mediaQueryUpdateEffect() {
			mobileQuery.addEventListener('change', setIsMobile);
			tabletQuery.addEventListener('change', setIsTablet);
			desktopQuery.addEventListener('change', setIsDesktop);

			return () => {
				mobileQuery.removeEventListener('change', setIsMobile);
				tabletQuery.removeEventListener('change', setIsTablet);
				desktopQuery.removeEventListener('change', setIsDesktop);
			};
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
};

export { useMediaQuery };
