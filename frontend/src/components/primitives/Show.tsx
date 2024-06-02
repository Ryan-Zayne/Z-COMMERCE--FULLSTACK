import { isSlotElement, useSlot } from "@/lib/hooks/useSlot";
import { Children, useMemo } from "react";

type ShowProps = {
	when: boolean;
	children: React.ReactNode;
	fallback?: React.ReactNode;
};

function Show({ when, children, fallback }: ShowProps) {
	const fallBackChild = useSlot(children, ShowFallback, {
		throwOnMultipleMatch: true,
		errorMessage: "Only one <Show.Fallback> component is allowed",
	});

	if (fallBackChild && fallback) {
		throw new Error(`
			Both fallback mechanisms cannot be used at the same time.
			Either the "fallback" prop is used or "<Show.Fallback>" component is used
		`);
	}

	const restOfChildren = useMemo(
		() => Children.toArray(children).filter((child) => !isSlotElement(child, ShowFallback)),
		[children]
	);

	return when ? restOfChildren : fallBackChild ?? fallback;
}

function ShowFallback({ children }: Pick<ShowProps, "children">) {
	return children;
}
ShowFallback.slot = Symbol.for("fallback");

Show.Fallback = ShowFallback;

export default Show;
