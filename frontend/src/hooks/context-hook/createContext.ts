import { createContext as createReactContext, useContext as useReactContext } from 'react';
import { getErrorMessage } from './getErrorMessage';

export type CreateContextOptions<TContext> = {
	name?: string;
	hookName?: string;
	providerName?: string;
	errorMessage?: string;
	defaultValue?: TContext;
};

class ContextError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ContextError';
	}
}

const createContext = <TDefaultContext>(options: CreateContextOptions<TDefaultContext | null> = {}) => {
	const {
		name = 'Unnamed Context',
		hookName = 'Unnamed Context hook',
		providerName = 'Unnamed Provider',
		errorMessage,
		defaultValue,
	} = options;

	const Context = createReactContext<TDefaultContext | null | undefined>(defaultValue);
	Context.displayName = name;

	// Extending useContext
	const useContext = () => {
		const contextValue = useReactContext(Context);

		if (contextValue == null) {
			throw new ContextError(errorMessage ?? getErrorMessage(hookName, providerName));
		}

		return contextValue;
	};

	return [Context.Provider, useContext] as const;
};

export { createContext };
