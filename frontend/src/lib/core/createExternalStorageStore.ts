import { isFunction, isObject } from "@/lib/type-helpers/typeof";
import { on } from "@/lib/utils/on";
import { parseJSON } from "@/lib/utils/parseJSON";
import type { NewStateFn, StoreApi } from "./createStore";

export type StorageOptions<TStorageValue> = {
	storageArea?: "localStorage" | "sessionStorage";
	shouldSyncData?: boolean;
	logger?: (error: unknown) => void;
	parser?: (value: unknown) => TStorageValue;
	stringifier?: (object: TStorageValue | null) => string;
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

const createExternalStorageStore = <TStorageValue>(
	key: string,
	defaultValue: TStorageValue,
	options: StorageOptions<TStorageValue> = {}
) => {
	const {
		shouldSyncData = true,
		storageArea = "localStorage",
		stringifier = JSON.stringify,
		parser = parseJSON<TStorageValue>,
		logger = console.info,
	} = options;

	const selectedStorage = window[storageArea];

	let rawStorageValue: ReturnType<typeof selectedStorage.getItem> = selectedStorage.getItem(key);

	const tabIdActions = handleCurrentTabId(shouldSyncData);

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

	const setState: StoreApi<TStorageValue | null>["setState"] = (newState, shouldReplace) => {
		const previousState = getState();

		const nextState = isFunction<NewStateFn<TStorageValue | null>>(newState)
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

	const subscribe: StoreApi<TStorageValue>["subscribe"] = (onStoreChange) => {
		const handleStorageStoreChange = (event: StorageEvent) => {
			// == This would prevent state syncing across tabs if `shouldSyncData` is set to `false`
			if (!shouldSyncData && window.name !== tabIdActions?.get()) return;

			if (event.key !== key || event.storageArea !== selectedStorage) return;

			if (Object.is(event.oldValue, event.newValue)) return;

			onStoreChange(parser(event.oldValue as string), parser(event.newValue as string));
		};

		const removeStorageEvent = on("storage", window, handleStorageStoreChange);

		return removeStorageEvent;
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
	};
};

export { createExternalStorageStore };
