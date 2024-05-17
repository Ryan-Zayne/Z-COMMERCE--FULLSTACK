import type { Prettify } from "@/lib/type-helpers/global-type-helpers";
import type { useToggle } from "../useToggle";

type UsePresenceOptions<TDuration extends number | undefined, THasType extends boolean> = Prettify<
	{
		/**
		 *  The duration of the animation or transition
		 */
		duration?: TDuration;
		/**
		 * A callback function that will be called when the animation or transition ends
		 */
		callbackFn?: () => void;
	} & (THasType extends true
		? /**
			 * The type of animation, whether animation or transition
			 */
			{ type?: "animation" | "transition" }
		: unknown)
>;

type UsePresenceResult<TElement, TDuration> = Prettify<
	{
		isPresent: boolean;
		isVisible: boolean;
		toggleVisibility: ReturnType<typeof useToggle>[1];
	} & (TDuration extends undefined ? { elementRef: React.RefObject<TElement> } : unknown)
>;

export type UseSpecificPresence = <
	TElement extends HTMLElement,
	TDuration extends number | undefined = undefined,
>(
	defaultValue?: boolean,
	options?: UsePresenceOptions<TDuration, false>
) => UsePresenceResult<TElement, TDuration>;

export type UsePresence = <TElement extends HTMLElement, TDuration extends number | undefined = undefined>(
	defaultValue?: boolean,
	options?: UsePresenceOptions<TDuration, true>
) => UsePresenceResult<TElement, TDuration>;
