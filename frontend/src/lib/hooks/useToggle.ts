import { useCallback, useState } from "react";

type InitialState = boolean | (() => boolean);

const useToggle = (initialValue: InitialState = false) => {
	const [value, setValue] = useState(initialValue);

	const toggle = useCallback(<TValue>(newValue?: TValue) => {
		if (typeof newValue === "boolean") {
			setValue(newValue);
			return;
		}

		setValue((prev) => !prev);
	}, []);

	return [value, toggle] as const;
};

export { useToggle };
