type CheckDeviceReturnType = {
	isMobileOrTablet: boolean;
};

const checkDeviceIsMobileOrTablet = (): CheckDeviceReturnType => {
	const deviceHasMouse = window.matchMedia('(pointer:fine)').matches;

	if (deviceHasMouse) {
		return { isMobileOrTablet: false };
	}

	switch (true) {
		case 'ontouchstart' in window && 'maxTouchPoints' in navigator: {
			return { isMobileOrTablet: navigator.maxTouchPoints > 0 };
		}

		case 'userAgentData' in navigator && (navigator.userAgentData as { mobile: boolean }).mobile: {
			return { isMobileOrTablet: true };
		}

		case window.matchMedia('(pointer:coarse)').matches: {
			return { isMobileOrTablet: true };
		}

		default: {
			const mobileDeviceRegex = /android|webos|iphone|ipad|ipod|blackberry|mobi|iemobile|opera mini/i;

			return { isMobileOrTablet: mobileDeviceRegex.test(navigator.userAgent) };
		}
	}
};

export { checkDeviceIsMobileOrTablet };
