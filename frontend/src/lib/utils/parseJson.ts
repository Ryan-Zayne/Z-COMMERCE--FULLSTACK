import { isBrowser } from "./constants";

const parseJSON = <TResult>(value: string | undefined | null) => {
	if (!isBrowser || value == null) {
		return null;
	}

	return JSON.parse(value) as TResult;
};

export { parseJSON };

// type Route = { path: string; children?: Routes };
// type Routes = Record<string, Route>;

// const routes = {
//   AUTH: {
//     path: "/auth",
//   },
// } as const satisfies Routes;
