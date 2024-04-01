import { isObject } from "@/lib/type-helpers/typeof";
import { twMerge } from "tailwind-merge";

export type UnknownProps = Record<string, unknown>;

const mergeProps = (slotProps: UnknownProps, childProps: UnknownProps) => {
	// all child props should override slotProps
	const overrideProps = { ...childProps };

	for (const propName of Object.keys(slotProps)) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];

		const isHandler = /^on[A-Z]/.test(propName);

		if (!isHandler) continue;

		// if the handler exists on both, we compose them
		if (typeof slotPropValue === "function" && typeof childPropValue === "function") {
			overrideProps[propName] = (...args: unknown[]) => {
				childPropValue(...args);
				slotPropValue(...args);
			};
		}

		// but if it exists only on the slot, we use only that one
		if (typeof slotPropValue === "function") {
			overrideProps[propName] = slotPropValue;
		}
	}

	return {
		...slotProps,
		...overrideProps,

		className: twMerge(slotProps.className as string, overrideProps.className as string),

		style: {
			...(isObject(slotProps.style) && slotProps.style),
			...(isObject(overrideProps.style) && overrideProps.style),
		},
	} as Record<string, unknown>;
};

export { mergeProps };
