import { isArray, isString } from "../../type-helpers/typeof";
import type {
	AddEventParams,
	ElementOrSelectorArray,
	ElementOrSelectorSingle,
	ElementOrSelectorSingleOrArray,
	ON,
	RegisterConfig,
} from "./on.types";

const registerSingle = (element: ElementOrSelectorSingle<null> | Window, config: RegisterConfig) => {
	const { type, event, listener, options } = config;

	const actionType = type === "add" ? "addEventListener" : "removeEventListener";

	if (!element) {
		console.error("Element is undefined, null or is an invalid selector");
		return;
	}

	if (isString(element)) {
		const nodeList = document.querySelectorAll<HTMLElement>(element);

		nodeList.forEach((node) => node[actionType](event, listener as unknown as EventListener, options));
		return;
	}

	element[actionType](event, listener as unknown as EventListener, options);
};

const registerMultiple = (
	elementArray: ElementOrSelectorArray<null> | Window[],
	config: RegisterConfig
) => {
	const { type, event, listener, options } = config;

	const actionType = type === "add" ? "addEventListener" : "removeEventListener";

	if (elementArray.length === 0) {
		console.error("ElementArray is empty!");
		return;
	}

	for (const element of elementArray) {
		if (!element) {
			console.error("Element is undefined, null or is an invalid selector!");

			continue;
		}

		if (isString(element)) {
			const nodeList = document.querySelectorAll<HTMLElement>(element);

			nodeList.forEach((node) =>
				node[actionType](event, listener as unknown as EventListener, options)
			);

			continue;
		}

		element[actionType](event, listener as unknown as EventListener, options);
	}
};

const register = (element: ElementOrSelectorSingleOrArray<null> | Window, config: RegisterConfig) => {
	if (isArray(element)) {
		registerMultiple(element, config);
		return;
	}

	registerSingle(element, config);
};

const on: ON = (...params: AddEventParams) => {
	const [event, element, listener, options] = params;

	const boundListener = () => listener.call(element, event, cleanup);

	const attach = () => {
		register(element, { type: "add", event, listener: boundListener, options });

		return cleanup;
	};

	const cleanup = () => {
		register(element, { type: "remove", event, listener: boundListener, options });

		return attach;
	};

	return attach();
};

export { on };
