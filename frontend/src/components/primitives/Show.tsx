import { getOtherChildren, getSlotElement } from "@/lib/core/getSlotElement";

type ShowProps = {
	when: boolean;
	children: React.ReactNode;
	fallback?: React.ReactNode;
};

function Show({ when, children, fallback }: ShowProps) {
	const fallBackChild = getSlotElement(children, ShowFallback, {
		throwOnMultipleSlotMatch: true,
		errorMessage: "Only one <Show.Default> component is allowed",
	});

	const otherChildren = getOtherChildren(children, ShowFallback);

	if (fallBackChild && fallback) {
		throw new Error(`
			Both fallback mechanisms cannot be used at the same time.
			Either the "fallback" prop is used or "<Show.Fallback>" component is used
		`);
	}

	return when ? otherChildren : (fallBackChild ?? fallback);
}

function ShowFallback({ children }: Pick<ShowProps, "children">) {
	return children;
}
ShowFallback.slot = Symbol.for("fallback");

Show.Fallback = ShowFallback;

export default Show;
