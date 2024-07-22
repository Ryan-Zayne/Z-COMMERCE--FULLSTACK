import { useEffect, useRef, useState } from "react";
import { isBrowser } from "../utils/constants";
import { useConstant } from "./useConstant";

const useScrollObserver = <TElement extends HTMLElement>(options: IntersectionObserverInit = {}) => {
	const { rootMargin = "10px 0px 0px 0px", ...restOfOptions } = options;

	const observedElementRef = useRef<TElement>(null);

	const [isScrolled, setIsScrolled] = useState(false);

	const elementObserver = useConstant(() => {
		if (!isBrowser()) return;

		return new IntersectionObserver(
			([entry]) => {
				if (!entry) return;
				setIsScrolled(!entry.isIntersecting);
			},
			{ rootMargin, ...restOfOptions }
		);
	});

	useEffect(() => {
		if (!observedElementRef.current || !elementObserver) return;

		const scrollWatcher = document.createElement("span");
		scrollWatcher.dataset.scrollWatcher = "";

		observedElementRef.current.before(scrollWatcher);

		elementObserver.observe(scrollWatcher);

		return () => {
			scrollWatcher.remove();
			elementObserver.disconnect();
		};
	}, [elementObserver]);

	return { isScrolled, observedElementRef };
};

export { useScrollObserver };
