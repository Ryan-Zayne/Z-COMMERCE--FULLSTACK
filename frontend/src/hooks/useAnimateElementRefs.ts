import { useCallback, useRef } from 'react';

type PossibleElementsType = 'heading' | 'button' | 'paragraph';

type ElementsInfoType = Array<{
	targetElement: PossibleElementsType;
	animationClass: string;
}>;

type ElementsRefType = Record<'button' | 'heading' | 'paragraph', HTMLElement | null>;

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

const useAnimateElementRefs = ({ elementsInfo = defaultElementsInfo }: AnimateCarouselOptions = {}) => {
	const elementsRef = useRef({} as ElementsRefType);

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
			elementsRef.current[targetElement]?.addEventListener('animationend', () => {
				elementsRef.current[targetElement]?.classList.remove(animationClass);
			});
		}
	}, [elementsInfo]);

	// Add animation classes to elements and remove them after the animation ends
	const handleElementsAnimation = useCallback(() => {
		addAnimationClasses();

		removeAnimationClasses();
	}, [addAnimationClasses, removeAnimationClasses]);

	return { animatedElements: elementsRef.current, handleElementsAnimation };
};

export { useAnimateElementRefs };