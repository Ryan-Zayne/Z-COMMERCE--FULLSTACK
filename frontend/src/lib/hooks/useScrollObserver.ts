import { useEffect, useRef, useState } from "react";

const useScrollObserver = <TElement extends HTMLElement = HTMLDivElement>(
	options: IntersectionObserverInit = {}
) => {
	const elementRef = useRef<TElement>(null);
	const [isScrolled, setIsScrolled] = useState(false);

	const [scrollObserver] = useState(
		() =>
			new IntersectionObserver(([entry]) => {
				setIsScrolled(!entry?.isIntersecting);
			}, options)
	);

	useEffect(
		function scrollObservationEffect() {
			const elementNode = elementRef.current;
			const scrollWatcher = document.createElement("span");
			scrollWatcher.dataset.scrollTracker = "";

			elementNode && elementNode.before(scrollWatcher);

			scrollObserver.observe(scrollWatcher);

			return () => {
				scrollWatcher.remove();
				scrollObserver.disconnect();
			};
		},
		[scrollObserver]
	);

	return { elementRef, isScrolled };
};

export { useScrollObserver };
