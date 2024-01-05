import { isArray, isObject } from "@/lib/types/typeof.ts";
import { pickKeys } from "./pickKeys.ts";

type SyncStorageParams =
	| [key: string, state: string]
	| [key: string, state: Record<string, unknown> | unknown[]]
	| [key: string, state: Record<string, unknown>, keysToSelect: string[]];

function syncStateWithStorage<TKey extends string, TStringState extends string>(
	...params: [key: TKey, state: TStringState]
): void;

function syncStateWithStorage<
	TKey extends string,
	TCompositeState extends Record<string, unknown> | unknown[],
>(...params: [key: TKey, state: TCompositeState]): void;

function syncStateWithStorage<
	TKey extends string,
	TObject extends Record<string, unknown>,
	const TPickArray extends Array<keyof TObject>,
>(...params: [key: TKey, state: TObject, keysToSelect: TPickArray]): void;

// Overload Implementation
function syncStateWithStorage(...params: SyncStorageParams): void {
	const [storageKey, state, keysToOmit] = params;

	switch (true) {
		case isObject(state) && keysToOmit !== undefined: {
			const stateSlice = pickKeys(state, keysToOmit);

			localStorage.setItem(storageKey, JSON.stringify(stateSlice));
			break;
		}

		case isObject(state) || isArray(state): {
			localStorage.setItem(storageKey, JSON.stringify(state));
			break;
		}

		default: {
			localStorage.setItem(storageKey, state);
		}
	}
}

syncStateWithStorage("sdsdd", { state: "hello", age: 11 }, ["age"]);

export { syncStateWithStorage };
