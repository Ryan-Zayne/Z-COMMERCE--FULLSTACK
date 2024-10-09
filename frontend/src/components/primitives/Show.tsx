"use client";

import { getOtherChildren, getSlotElement } from "@zayne-labs/toolkit/react";

type ShowProps = {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	when: boolean;
};

function Show({ children, fallback, when }: ShowProps) {
	const fallBackSlot = getSlotElement(children, ShowFallback, {
		errorMessage: "Only one <Show.Default> component is allowed",
		throwOnMultipleSlotMatch: true,
	});

	const otherChildren = getOtherChildren(children, [ShowFallback]);

	if (fallBackSlot && fallback) {
		throw new Error(`
			Both fallback mechanisms cannot be used at the same time.
			Either the "fallback" prop is used or "<Show.Fallback>" component is used
		`);
	}

	return when ? otherChildren : (fallBackSlot ?? fallback);
}

function ShowFallback({ children }: Pick<ShowProps, "children">) {
	return children;
}
ShowFallback.slot = Symbol.for("fallback");

Show.Fallback = ShowFallback;

export default Show;
