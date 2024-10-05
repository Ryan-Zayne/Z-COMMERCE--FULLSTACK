import type { useToggle } from "@zayne-labs/toolkit/react";
import type { Prettify } from "@zayne-labs/toolkit/type-helpers";

type UsePresenceOptions<TDuration extends number | undefined> = {
	/**
	 * @description The initial value for whether the element should be present in the dom or not
	 */
	defaultValue?: boolean;
	/**
	 * @description The duration of the animation or transition
	 */
	duration?: TDuration;
	/**
	 * @description A callback function that will be called when the animation or transition ends
	 */
	onExitComplete?: () => void;
	/**
	 * @description The reactive value for whether the element should be present in the dom or not
	 */
	reactiveValue?: boolean;
};

type UsePresenceResult<TElement, TDuration> = Prettify<
	(TDuration extends undefined ? { elementRef: React.RefObject<TElement> } : unknown) & {
		/**
		 * @description
		 * - The current value of the whether the element should be present in the dom or not
		 * - Used to toggle the element's mount or unmount
		 */
		isPresent: boolean;
		/**
		 * @description
		 * - The current value of the whether the element should be visible or not
		 * - Used to toggle the element's styles
		 */
		isVisible: boolean;
		/**
		 * @description function to toggle the element's visibility
		 */
		toggleVisibility: ReturnType<typeof useToggle>[1];
	}
>;

export type UseSpecificPresence = <
	TElement extends HTMLElement,
	TDuration extends number | undefined = undefined,
>(
	options?: UsePresenceOptions<TDuration>
) => UsePresenceResult<TElement, TDuration>;

type TypeOption = {
	/**
	 * @description The type of animation, whether animation or transition
	 * @default "transition"
	 */
	type?: "animation" | "transition";
};

export type UsePresence = <TElement extends HTMLElement, TDuration extends number | undefined = undefined>(
	options?: Prettify<TypeOption & UsePresenceOptions<TDuration>>
) => UsePresenceResult<TElement, TDuration>;
