import type { PolymorphicProps } from "@zayne-labs/toolkit/react/utils";

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

type ForProps<TArrayItem> = EachProp<TArrayItem> & ForRenderProps<TArrayItem>;

function ForBase<TArrayItem>(props: ForProps<TArrayItem>) {
	const { children, each, render } = props;

	// eslint-disable-next-line ts-eslint/no-unnecessary-condition
	if (each == null) {
		return null;
	}

	if (each.length === 0) {
		return each;
	}

	const JSXElementList = each.map((...params: Parameters<RenderPropFn<TArrayItem>>) => {
		if (typeof children === "function") {
			return children(...params);
		}

		return render(...params);
	});

	return JSXElementList;
}

function ForList<TArrayItem, TElement extends React.ElementType = "ul">(
	props: PolymorphicProps<TElement, ForProps<TArrayItem> & { className?: string }>
) {
	const { as: ListContainer = "ul", children, className, each, ref, render, ...restOfListProps } = props;

	// eslint-disable-next-line ts-eslint/no-unnecessary-condition
	if (each == null) {
		return null;
	}

	return (
		<ListContainer ref={ref} className={className} {...restOfListProps}>
			<ForBase {...({ children, each, render } as ForProps<TArrayItem>)} />
		</ListContainer>
	);
}

export const Base = ForBase;

export const List = ForList;
