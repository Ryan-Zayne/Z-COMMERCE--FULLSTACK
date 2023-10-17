import { useCallback, useRef } from 'react';

type ElementsInfoType = Array<{
	targetElement: string;
	animationClass: string;
}>;

type AnimateCarouselOptions = {
	elementsInfo?: ElementsInfoType;
};

class ELementError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ELementError';
	}
}

const defaultElementsInfo = [
	{ targetElement: 'heading', animationClass: 'animate-fade-in-down' },
	{ targetElement: 'button', animationClass: 'animate-fade-in-up' },
	{ targetElement: 'paragraph', animationClass: 'animate-fade-in-up-2' },
] satisfies ElementsInfoType;

const useAnimateCarouselRefs = ({ elementsInfo = defaultElementsInfo }: AnimateCarouselOptions = {}) => {
	const elementsRef = useRef({} as Record<string, HTMLElement | null>);

	const addAnimationClasses = useCallback(() => {
		for (const { targetElement, animationClass } of elementsInfo) {
			if (!elementsRef.current[targetElement]) {
				throw new ELementError(`"${targetElement}" element does not exist`);
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

		for (const { targetElement } of elementsInfo) {
			elementsRef.current[targetElement]?.addEventListener('animationend', removeAnimationClasses);
		}
	}, [addAnimationClasses, elementsInfo, removeAnimationClasses]);

	return { animatedElements: elementsRef.current, handleElementsAnimation };
};

export { useAnimateCarouselRefs };

