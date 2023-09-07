type ConditionalProps<TArrayItem> =
	| {
			each: TArrayItem[];
			children?: "Hey, Sorry but you've already used the render prop so the children prop is redundant";
			render: (item: TArrayItem, index: number) => React.JSX.Element;
	  }
	| {
			each: TArrayItem[];
			children: (item: TArrayItem, index: number) => React.JSX.Element;
			render?: "Hey, Sorry but you've already used the children prop so the render prop is redundant";
	  };

function For<TProp>({ each, render, children }: ConditionalProps<TProp>) {
	const mappedElements = each.map((item, index) => {
		if (typeof render === 'function') {
			return render(item, index);
		}

		return children(item, index);
	});

	return mappedElements;
}

export default For;
