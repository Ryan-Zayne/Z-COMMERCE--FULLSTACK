import { useState } from "react";
import { useCallbackRef } from "./useCallbackRef";

type InitialState = boolean | (() => boolean);

const useToggle = (initialValue: InitialState = false) => {
	const [value, setValue] = useState(initialValue);

	const toggle = useCallbackRef(<TValue>(booleanValue?: TValue) => {
		if (typeof booleanValue === "boolean") {
			setValue(booleanValue);
			return;
		}

		setValue((prev) => !prev);
	});

	return [value, toggle] as const;
};

export { useToggle };
