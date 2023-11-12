type ForProps<TArrayItem> =
	| {
			each: TArrayItem[];
			children?: "Hey, Sorry but you've already used the render prop so the children prop is redundant";
			render: (item: TArrayItem, index: number) => React.ReactNode;
	  }
	| {
			each: TArrayItem[];
			children: (item: TArrayItem, index: number) => React.ReactNode;
			render?: "Hey, Sorry but you've already used the children prop so the render prop is redundant";
	  };

function For<TProp>({ each, render, children }: ForProps<TProp>) {
	if (!each || !Array.isArray(each)) {
		throw new TypeError('Variable passed to the "each" prop is not an array or is undefined');
	}

	const mappedElements = each.map((item, index) => {
		if (typeof children === 'function') {
			return children(item, index);
		}

		return render(item, index);
	});

	return mappedElements;
}

export default For;
