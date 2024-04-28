export type ElementOrSelectorSingle<TOptional = never> = HTMLElement | string | TOptional;

export type ElementOrSelectorArray<TOptional = never> = [
	HTMLElement | string | TOptional,
	...Array<HTMLElement | string | TOptional>,
];

export type ElementOrSelectorSingleOrArray<TOptional = never> =
	| ElementOrSelectorSingle<TOptional>
	| ElementOrSelectorArray<TOptional>;

type Listener<TEvent extends keyof TNodeEventMap, TNode, TNodeEventMap> = (
	this: TNode,
	event: TNodeEventMap[TEvent],
	cleanup: () => () => void
) => void;

export type AddHtmlEvents<TEvent extends keyof HTMLElementEventMap = keyof HTMLElementEventMap> = [
	event: TEvent,
	element: ElementOrSelectorSingleOrArray<null>,
	listener: Listener<TEvent, HTMLElement, HTMLElementEventMap>,
	options?: boolean | AddEventListenerOptions,
];

export type AddWindowEvents<TEvent extends keyof WindowEventMap = keyof WindowEventMap> = [
	event: TEvent,
	element: Window,
	listener: Listener<TEvent, Window, WindowEventMap>,
	options?: boolean | AddEventListenerOptions,
];

export type AddEventParams = [
	event: string,
	element: ElementOrSelectorSingleOrArray<null> | Window,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	listener: (...args: any[]) => void,
	options?: boolean | AddEventListenerOptions,
];

export type ON = {
	<TEvent extends keyof WindowEventMap>(...params: AddWindowEvents<TEvent>): () => void;
	<TEvent extends keyof HTMLElementEventMap>(...params: AddHtmlEvents<TEvent>): () => void;
};

export type RegisterConfig = {
	type: "add" | "remove";
	event: string;
	listener: AddHtmlEvents[2] | AddWindowEvents[2];
	options?: boolean | AddEventListenerOptions;
};
