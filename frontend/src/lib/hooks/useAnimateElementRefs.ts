import { cnJoin } from "@/lib/utils/cn";
import { useCallback, useRef } from "react";
import { on } from "../utils/on";
import { useCallbackRef } from "./useCallbackRef";

type PossibleElementsType = "heading" | "button" | "paragraph";

type ElementsRefType = Record<"button" | "heading" | "paragraph", HTMLElement | null>;

type AnimateElementsOptions = {
	elementsInfo?: Array<{
		targetElement: PossibleElementsType;
		animationClass: string;
	}>;

	stopAnimation?: boolean;
};

class ELementError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ELementError";
	}
}

const getdefaultElementsInfo = (stopAnimation: boolean) => {
	const stopAnimationClass = stopAnimation && "animation-none";

	return [
		{
			targetElement: "heading",
			animationClass: cnJoin("animate-fade-in-down", stopAnimationClass),
		},
		{
			targetElement: "button",
			animationClass: cnJoin("animate-fade-in-up", stopAnimationClass),
		},
		{
			targetElement: "paragraph",
			animationClass: cnJoin("animate-fade-in-up-2", stopAnimationClass),
		},
	] satisfies AnimateElementsOptions["elementsInfo"];
};

const useAnimateElementRefs = (options: AnimateElementsOptions = {}) => {
	const { stopAnimation = false, elementsInfo = getdefaultElementsInfo(stopAnimation) } = options;

	const elementsRef = useRef({} as ElementsRefType);

	const addAnimationClasses = useCallbackRef(() => {
		for (const { targetElement, animationClass } of elementsInfo) {
			if (!elementsRef.current[targetElement]) {
				throw new ELementError(`"${targetElement}" element does not exist`);
			}

			elementsRef.current[targetElement]?.classList.add(animationClass);
		}
	});

	const removeAnimationClasses = useCallbackRef(() => {
		for (const { targetElement, animationClass } of elementsInfo) {
			on("transitionend", elementsRef.current[targetElement], () => {
				elementsRef.current[targetElement]?.classList.remove(animationClass);
			});
		}
	});

	// Add animation classes to elements and remove them after the animation ends
	const handleElementsAnimation = useCallback(() => {
		addAnimationClasses();

		removeAnimationClasses();
	}, [addAnimationClasses, removeAnimationClasses]);

	return { animatedElements: elementsRef.current, handleElementsAnimation };
};

export { useAnimateElementRefs };
