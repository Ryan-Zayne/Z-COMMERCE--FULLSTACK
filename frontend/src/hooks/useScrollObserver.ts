import { useEffect, useRef, useState } from 'react';

const useScrollObserver = <T extends HTMLDivElement>(options?: IntersectionObserverInit) => {
	const elementRef = useRef<T>(null);
	const [isScrolled, setIsScrolled] = useState(false);

	const [scrollObserver] = useState(
		() =>
			new IntersectionObserver(([entry]) => {
				setIsScrolled(!entry?.isIntersecting);
			}, options)
	);

	useEffect(() => {
		const elementNode = elementRef.current;
		const scrollWatcher = document.createElement('span');
		scrollWatcher.dataset.scrollWatcher = '';

		if (elementNode) {
			elementNode.before(scrollWatcher);
		}

		scrollObserver.observe(scrollWatcher);

		return () => {
			scrollWatcher.remove();
			scrollObserver.disconnect();
		};
	}, [scrollObserver]);

	return { elementRef, isScrolled };
};

export { useScrollObserver };
