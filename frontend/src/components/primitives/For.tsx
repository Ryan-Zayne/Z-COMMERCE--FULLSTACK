import type { ForwardedRefType } from "@/lib/type-helpers/global-type-helpers";
import type { PolymorphicPropsWithRef } from "@/lib/type-helpers/polymorphism";
import { forwardRef } from "react";

// prettier-ignore
type RenderPropFn<TArrayItem> = (
	item: TArrayItem,
	index: number,
	array: TArrayItem[]
) => React.ReactNode;

export type EachProp<TArrayItem> = { each: TArrayItem[] };

export type ForRenderProps<TArrayItem> =
	| {
			children: RenderPropFn<TArrayItem>;
			render?: "Hey, Sorry but since your're currently using the children prop, the render prop is now redundant";
	  }
	| {
			children?: "Hey, Sorry but since your're currently using the render prop, so the children prop is now redundant";
			render: RenderPropFn<TArrayItem>;
	  };

type ForProps<TArrayItem> = ForRenderProps<TArrayItem> & EachProp<TArrayItem>;

function ForBase<TArrayItem>(props: ForProps<TArrayItem>) {
	const { each, render, children } = props;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (each == null) {
		return [];
	}

	const JSXElementList = each.map((...params) => {
		const coercedParams = params as Parameters<RenderPropFn<TArrayItem>>;

		if (typeof children === "function") {
			return children(...coercedParams);
		}

		return render(...coercedParams);
	});

	return JSXElementList;
}

function ForList<TArrayItem, TElement extends React.ElementType = "ul">(
	props: PolymorphicPropsWithRef<TElement, ForProps<TArrayItem> & { className?: string }>,
	ref: ForwardedRefType<HTMLElement>
) {
	const { each, render, children, as: ListContainer = "ul", className, ...restOfListProps } = props;

	return (
		<ListContainer className={className} {...restOfListProps} ref={ref}>
			<ForBase {...({ each, render, children } as ForProps<TArrayItem>)} />
		</ListContainer>
	);
}

const For = {
	Base: ForBase,
	List: forwardRef(ForList) as typeof ForList,
};

export default For;
