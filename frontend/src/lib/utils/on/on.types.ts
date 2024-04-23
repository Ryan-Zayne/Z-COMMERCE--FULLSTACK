export type ElementOrSelectorSingle<TOptional = never> = HTMLElement | string | TOptional;

export type ElementOrSelectorArray<TOptional = never> = [
	HTMLElement | string | TOptional,
	...Array<HTMLElement | string | TOptional>,
];

export type ElementOrSelectorSingleOrArray<TOptional = never> =
	| ElementOrSelectorSingle<TOptional>
	| ElementOrSelectorArray<TOptional>;

export type AddHtmlEvents<TEvent extends keyof HTMLElementEventMap = keyof HTMLElementEventMap> = [
	event: TEvent,
	element: ElementOrSelectorSingleOrArray<null>,
	listener: (
		this: HTMLElement, // == Ts somehow doesn't consider "this" as part of the available params
		event: HTMLElementEventMap[TEvent]
	) => void,
	options?: boolean | AddEventListenerOptions,
];

export type AddWindowEvents<TEvent extends keyof WindowEventMap = keyof WindowEventMap> = [
	event: TEvent,
	element: Window,
	listener: (this: Window, event: WindowEventMap[TEvent]) => void,
	options?: boolean | AddEventListenerOptions,
];

export type AddEventParams = AddHtmlEvents | AddWindowEvents;

export type OnFn = {
	<TEvent extends keyof WindowEventMap>(...params: AddWindowEvents<TEvent>): () => void;
	<TEvent extends keyof HTMLElementEventMap>(...params: AddHtmlEvents<TEvent>): () => void;
};

export type RegisterConfig = {
	type: "add" | "remove";
	event: string;
	listener: AddHtmlEvents[2] | AddWindowEvents[2];
	options?: boolean | AddEventListenerOptions;
};
