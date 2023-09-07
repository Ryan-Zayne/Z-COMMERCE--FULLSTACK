import { createContext as createReactContext, useContext as useReactContext } from 'react';
import { getErrorMessage } from './getErrorMessage';

export type CreateContextOptions<TContext> = {
	name?: string;
	hookName?: string;
	providerName?: string;
	errorMessage?: string;
	defaultValue?: TContext;
};

const createContext = <TDefaultContext>(options: CreateContextOptions<TDefaultContext | null>) => {
	const {
		name = 'Unnamed Context',
		hookName = 'Unnamed Context hook',
		providerName = 'Unnamed Provider',
		errorMessage,
		defaultValue,
	} = options ?? {};

	const Context = createReactContext<TDefaultContext | null | undefined>(defaultValue);
	Context.displayName = name;

	// Extending useContext
	const useContext = () => {
		const contextValue = useReactContext(Context);

		if (contextValue == null) {
			const error = new Error(errorMessage ?? getErrorMessage(hookName, providerName));
			error.name = 'ContextError';
			Error.captureStackTrace?.(error, useContext);
			throw error;
		}

		return contextValue;
	};

	return [Context.Provider, useContext] as const;
};

export default createContext;
