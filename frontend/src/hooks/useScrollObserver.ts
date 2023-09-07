import { useEffect, useRef, useState } from 'react';

const useScrollObserver = <T extends HTMLElement = HTMLDivElement>(options = {}) => {
	const elementRef = useRef<T>(null);
	const [isScrolled, setIsScrolled] = useState(false);

	const [scrollObserver] = useState(
		() =>
			new IntersectionObserver(([entry]) => {
				setIsScrolled(!entry?.isIntersecting);
			}, options)
	);

	useEffect(() => {
		const scrollWatcher = document.createElement('span');
		scrollWatcher.dataset.scrollWatcher = '';

		if (elementRef.current) {
			elementRef.current.before(scrollWatcher);
		}

		scrollObserver.observe(scrollWatcher);

		return () => {
			scrollWatcher.remove();
			scrollObserver.disconnect();
		};
	}, [scrollObserver]);

	return { isScrolled, elementRef };
};

export { useScrollObserver };
