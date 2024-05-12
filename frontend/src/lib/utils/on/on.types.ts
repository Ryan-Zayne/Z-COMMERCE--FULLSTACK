export type ElementOrSelectorSingle<TOptional> = HTMLElement | string | TOptional;

export type ElementOrSelectorArray<TOptional> = [
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

export type AddMediaEvents<TEvent extends keyof MediaQueryListEventMap = keyof MediaQueryListEventMap> = [
	event: TEvent,
	element: MediaQueryList,
	listener: Listener<TEvent, MediaQueryList, MediaQueryListEventMap>,
	options?: boolean | AddEventListenerOptions,
];

export type AddEventParams = AddHtmlEvents | AddWindowEvents | AddMediaEvents;

export type ON = {
	<TEvent extends keyof HTMLElementEventMap>(...params: AddHtmlEvents<TEvent>): () => void;
	<TEvent extends keyof MediaQueryListEventMap>(...params: AddMediaEvents<TEvent>): () => void;
	<TEvent extends keyof WindowEventMap>(...params: AddWindowEvents<TEvent>): () => void;
};

export type RegisterConfig = {
	type: "add" | "remove";
	event: string;
	listener: AddHtmlEvents[2] | AddWindowEvents[2];
	options?: boolean | AddEventListenerOptions;
};
