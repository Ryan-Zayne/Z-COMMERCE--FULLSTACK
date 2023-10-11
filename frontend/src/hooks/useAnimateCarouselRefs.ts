import { useCallback, useRef } from 'react';

type ElementsInfoType = Array<{
	targetElement: string;
	animationClass: string;
}>;

type AnimateCarouselOptions = {
	elementsInfo?: ElementsInfoType;
};

class ELementError extends Error {
	name = 'ELementError';

	constructor(value: string) {
		super(`"${value}" element does not exist`);
	}
}

const defaultElementsInfo = [
	{ targetElement: 'heading', animationClass: 'animate-fade-in-down' },
	{ targetElement: 'button', animationClass: 'animate-fade-in-up' },
	{ targetElement: 'paragraph', animationClass: 'animate-fade-in-up-2' },
] satisfies ElementsInfoType;

const useAnimateCarouselRefs = ({ elementsInfo = defaultElementsInfo }: AnimateCarouselOptions = {}) => {
	const elementsRef = useRef({} as Record<string, HTMLElement | null>);
	const fadeAnimationId = useRef<NodeJS.Timeout>();

	const addAnimationClasses = useCallback(() => {
		for (const { targetElement, animationClass } of elementsInfo) {
			if (!elementsRef.current[targetElement]) {
				throw new ELementError(targetElement);
			}

			elementsRef.current[targetElement]?.classList.add(animationClass);
		}
	}, [elementsInfo]);

	const removeAnimationClasses = useCallback(() => {
		for (const { targetElement, animationClass } of elementsInfo) {
			elementsRef.current[targetElement]?.classList.remove(animationClass);
		}
	}, [elementsInfo]);

	// Add animation classes to elements and remove them after 2 seconds
	const handleElementsAnimation = useCallback(() => {
		addAnimationClasses();

		fadeAnimationId.current = setTimeout(() => {
			removeAnimationClasses();
			clearTimeout(fadeAnimationId.current);
		}, 2000);
	}, [addAnimationClasses, removeAnimationClasses]);

	return { animatedElements: elementsRef.current, handleElementsAnimation };
};

export { useAnimateCarouselRefs };

