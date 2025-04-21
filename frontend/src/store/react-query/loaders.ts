import { useQueryClientStore } from "./queryClientStore";
import { productKeyEnum, productQuery, sessionQuery } from "./queryFactory";

export const composeLoaders = (...loaders: Array<() => void>) => {
	return () => loaders.forEach((loader) => loader());
};

export const sessionLoader = () => {
	void useQueryClientStore.getState().queryClient.prefetchQuery(sessionQuery());
};

export const productLoader = () => {
	productKeyEnum.forEach(
		(key) => void useQueryClientStore.getState().queryClient.prefetchQuery(productQuery(key))
	);
};
