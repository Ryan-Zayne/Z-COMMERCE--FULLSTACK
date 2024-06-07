import { useGetOtherChildren, useSlot } from "@/lib/hooks/useSlot";

type ShowProps = {
	when: boolean;
	children: React.ReactNode;
	fallback?: React.ReactNode;
};

function Show({ when, children, fallback }: ShowProps) {
	const fallBackChild = useSlot(children, ShowFallback, {
		throwOnMultipleMatch: true,
		errorMessage: "Only one <Show.Default> component is allowed",
	});

	const otherChildren = useGetOtherChildren(children, ShowFallback);

	if (fallBackChild && fallback) {
		throw new Error(`
			Both fallback mechanisms cannot be used at the same time.
			Either the "fallback" prop is used or "<Show.Fallback>" component is used
		`);
	}

	return when ? otherChildren : fallBackChild ?? fallback;
}

function ShowFallback({ children }: Pick<ShowProps, "children">) {
	return children;
}
ShowFallback.slot = Symbol.for("fallback");

Show.Fallback = ShowFallback;

export default Show;
