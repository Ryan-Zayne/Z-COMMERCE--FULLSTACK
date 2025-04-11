import { useQueryClientStore } from "./queryClientStore";
import { productKeyEnum, productQuery, sessionQuery } from "./queryFactory";

export const sessionLoader = () => {
	void useQueryClientStore.getState().queryClient.prefetchQuery(sessionQuery());

	return null;
};

export const productLoader = () => {
	productKeyEnum.forEach(
		(key) => void useQueryClientStore.getState().queryClient.prefetchQuery(productQuery(key))
	);

	return null;
};
