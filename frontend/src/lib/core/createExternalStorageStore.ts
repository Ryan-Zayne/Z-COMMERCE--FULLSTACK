import { isFunction, isObject } from "@/lib/type-helpers/typeof";
import { on } from "@/lib/utils/on";
import { parseJSON } from "@/lib/utils/parseJSON";
import type { StoreApi, UpdateStateFn } from "./createStore";

export type StorageOptions<TStorageValue> = {
	storageArea?: "localStorage" | "sessionStorage";
	shouldSyncAcrossTabs?: boolean;
	logger?: (error: unknown) => void;
	parser?: (value: unknown) => TStorageValue;
	stringifier?: (object: TStorageValue | null) => string;
	equalityFn?: (nextState: TStorageValue, previousState: TStorageValue) => boolean;
};

const handleCurrentTabId = (shouldSyncData: boolean) => {
	if (shouldSyncData) return;

	window.name = crypto.randomUUID();
	localStorage.setItem("currentTab", window.name);

	const tabIdActions = {
		get: () => localStorage.getItem("currentTab"),
		set: () => {
			if (tabIdActions.get() !== window.name) {
				localStorage.setItem("currentTab", window.name);
			}
		},
	};

	return tabIdActions;
};

const createExternalStorageStore = <TStorageValue, TStorageSlice = TStorageValue>(
	key: string,
	defaultValue: TStorageValue,
	options: StorageOptions<TStorageValue> = {}
) => {
	const {
		shouldSyncAcrossTabs = true,
		storageArea = "localStorage",
		stringifier = JSON.stringify,
		parser = parseJSON<TStorageValue>,
		logger = console.info,
		equalityFn = Object.is,
	} = options;

	const selectedStorage = window[storageArea];

	let rawStorageValue: ReturnType<typeof selectedStorage.getItem> = selectedStorage.getItem(key);

	const tabIdActions = handleCurrentTabId(shouldSyncAcrossTabs);

	const getInitialStorageValue = () => {
		try {
			if (rawStorageValue === null) {
				return defaultValue;
			}

			const initialStorageValue = parser(rawStorageValue);

			return initialStorageValue;
		} catch (error) {
			logger(error);
			return defaultValue;
		}
	};

	const setAndDispatchStorageEvent = (dispatchOptions: StorageEventInit & { eventFn: () => void }) => {
		const { eventFn, url = window.location.href, ...restOfOptions } = dispatchOptions;

		eventFn();
		tabIdActions?.set();

		// == This manual event dispatch is necessary to ensure the storage event is triggered on the current window/tab, not just on other windows
		window.dispatchEvent(
			new StorageEvent("storage", {
				storageArea: selectedStorage,
				key,
				url,
				...restOfOptions,
			})
		);
	};

	const getState = () => parser(selectedStorage.getItem(key)) ?? getInitialStorageValue();

	const getInitialState = () => defaultValue;

	type $StoreApi = StoreApi<TStorageValue, TStorageSlice>;

	const setState: $StoreApi["setState"] = (newState, shouldReplace) => {
		const previousState = getState();

		const nextState = isFunction<UpdateStateFn<TStorageValue | null>>(newState)
			? newState(previousState)
			: newState;

		if (nextState === null) {
			removeState();
			return;
		}

		const oldValue = rawStorageValue;

		const newValue =
			!shouldReplace && isObject(previousState) && isObject(nextState)
				? stringifier({ ...previousState, ...nextState })
				: stringifier(nextState);

		rawStorageValue = newValue;

		setAndDispatchStorageEvent({
			eventFn: () => selectedStorage.setItem(key, newValue),
			key,
			oldValue,
			newValue,
		});
	};

	const subscribe: $StoreApi["subscribe"] = (onStoreChange) => {
		const handleStorageStoreChange = (event: StorageEvent) => {
			// == This would prevent state syncing across tabs if `shouldSyncData` is set to `false`
			if (!shouldSyncAcrossTabs && window.name !== tabIdActions?.get()) return;

			if (event.key !== key || event.storageArea !== selectedStorage) return;

			if (equalityFn(event.oldValue as never, event.newValue as never)) return;

			onStoreChange(parser(event.oldValue as string), parser(event.newValue as string));
		};

		const removeStorageEvent = on("storage", window, handleStorageStoreChange);

		return removeStorageEvent;
	};

	subscribe.withSelector = (selector, onStoreChange, subscribeOptions = {}) => {
		const { equalityFn: $equalityFn = equalityFn, fireListenerImmediately = false } = subscribeOptions;

		let slice = selector(getState());

		if (fireListenerImmediately) {
			onStoreChange(slice as never, slice as never);
		}

		const modifiedOnStoreChange = ($state: TStorageValue) => {
			const nextSlice = selector($state);

			if ($equalityFn(slice as never, nextSlice as never)) return;

			const previousSlice = slice;

			slice = nextSlice;

			onStoreChange(slice as never, previousSlice as never);
		};

		return subscribe(modifiedOnStoreChange);
	};

	const removeState = () => {
		setAndDispatchStorageEvent({ eventFn: () => selectedStorage.removeItem(key), key });
	};

	return {
		getState,
		getInitialState,
		setState,
		subscribe,
		removeState,
	} satisfies $StoreApi & { removeState: typeof removeState };
};

export { createExternalStorageStore };
