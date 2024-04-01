import { parseJSON } from "@/lib/utils/parseJSON";

export type StorageOptions<TStorageValue> = {
	shouldSyncData?: boolean;
	storageArea?: "localStorage" | "sessionStorage";
	logger?: (error: unknown) => void;
	parser?: (value: unknown) => TStorageValue;
	stringifier?: (object: TStorageValue | null) => string;
};

type SetStateFunction<TValue = unknown> = (value: TValue) => TValue;
type SetStateAction<TValue> = TValue | SetStateFunction<TValue> | null;

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
	options?: StorageOptions<TStorageValue>
) => {
	const {
		shouldSyncData = true,
		storageArea = "localStorage",
		stringifier = JSON.stringify,
		parser = parseJSON<TStorageValue>,
		logger = console.info,
	} = options ?? {};

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

	const externalStorageStore = {
		getServerSnapshot: () => defaultValue,

		getSnapshot: () => parser(selectedStorage.getItem(key)) ?? getInitialStorageValue(),

		setState: (newStorageValue: SetStateAction<TStorageValue>) => {
			const { removeState, getSnapshot } = externalStorageStore;

			if (newStorageValue === null) {
				removeState();
				return;
			}

			const oldValue = rawStorageValue;

			const newValue =
				typeof newStorageValue === "function"
					? stringifier((newStorageValue as SetStateFunction)(getSnapshot()))
					: stringifier(newStorageValue);

			rawStorageValue = newValue;

			setAndDispatchStorageEvent({
				eventFn: () => selectedStorage.setItem(key, newValue),
				key,
				oldValue,
				newValue,
			});
		},

		subscribe: (onStoreChange: () => void) => {
			const handleStorageStoreChange = (event: StorageEvent) => {
				// == This would prevent state syncing across tabs if `shouldSyncData` is set to `false`
				if (!shouldSyncData && window.name !== tabIdActions?.get()) return;

				if (event.key !== key || event.storageArea !== selectedStorage) return;

				if (Object.is(event.oldValue, event.newValue)) return;

				onStoreChange();
			};

			window.addEventListener("storage", handleStorageStoreChange);

			return () => window.removeEventListener("storage", handleStorageStoreChange);
		},

		removeState: () => {
			setAndDispatchStorageEvent({ eventFn: () => selectedStorage.removeItem(key), key });
		},
	};

	return externalStorageStore;
};

export { createExternalStorageStore };
