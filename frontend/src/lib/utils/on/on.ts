import { isArray, isString } from "../../type-helpers/typeof";
import type { AddEventParams, ON, RegisterConfig } from "./on.types";

const registerSingle = (element: unknown, config: RegisterConfig) => {
	const { type, event, listener, options } = config;

	const actionType = type === "add" ? "addEventListener" : "removeEventListener";

	if (!element) {
		console.error("Element is undefined, null or is an invalid selector");
		return;
	}

	if (isString(element)) {
		const nodeList = document.querySelectorAll<HTMLElement>(element);

		nodeList.forEach((node) => node[actionType](event, listener as never, options));

		return;
	}

	(element as HTMLElement)[actionType](event, listener as never, options);
};

const registerMultiple = (elementArray: unknown[], config: RegisterConfig) => {
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

			nodeList.forEach((node) => node[actionType](event, listener as never, options));

			continue;
		}

		(element as HTMLElement)[actionType](event, listener as never, options);
	}
};

const register = (element: AddEventParams["1"], config: RegisterConfig) => {
	if (isArray(element)) {
		registerMultiple(element, config);
		return;
	}

	registerSingle(element, config);
};

const on: ON = (...params: AddEventParams) => {
	const [event, element, listener, options] = params;

	const boundListener = () => (listener as (...args: unknown[]) => void).call(element, event, cleanup);

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
