import { useLocation } from "./useLocation";

const useSearchParams = <TSearchParams extends Record<string, string>>(
	action: "push" | "replace" = "push"
) => {
	const [search, setSearch] = useLocation((state) => state.search);

	const getParams = () => {
		const searchParams = new URLSearchParams(search);
		const searchParamObject = Object.fromEntries(searchParams.entries());

		return searchParamObject as TSearchParams;
	};

	const setParams = (queryParams: TSearchParams) => {
		const searchParams = new URLSearchParams(queryParams);

		setSearch[action](`?${searchParams.toString()}`);
	};

	return [getParams, setParams] as const;
};

export { useSearchParams };
