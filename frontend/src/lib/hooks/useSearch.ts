import { useState } from "react";
import { isObject } from "../type-helpers/typeof";
import { useAfterMountEffect } from "./effect-wrappers/useAfterMountEffect";
import { useDebouncedFn } from "./useDebounce";

const isSerializable = (item: unknown): item is string | number | boolean =>
	typeof item === "string" || typeof item === "number" || typeof item === "boolean";

const checkObjectPropsForQuery = (item: Record<string, unknown>, query: string): boolean => {
	for (const value of Object.values(item)) {
		if (isSerializable(value) && value.toString().toLowerCase().includes(query)) {
			return true;
		}
	}
	return false;
};

const useSearch = <TData>(initialData: TData[], delay?: number) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(initialData);
	const [isLoading, setIsLoading] = useState(false);

	const handleDebouncedSearch = useDebouncedFn(() => {
		const query = searchQuery.toLowerCase();

		const filteredResults = initialData.filter((item) => {
			if (isSerializable(item)) {
				return item.toString().toLowerCase().includes(query);
			}

			if (isObject(item)) {
				return checkObjectPropsForQuery(item, query);
			}

			return false;
		});

		setFilteredData(filteredResults);
		setIsLoading(false);
	}, delay);

	useAfterMountEffect(() => {
		setIsLoading(true);
		handleDebouncedSearch();
	}, [searchQuery]);

	return { query: searchQuery, setQuery: setSearchQuery, data: filteredData, isLoading };
};

export { useSearch };
