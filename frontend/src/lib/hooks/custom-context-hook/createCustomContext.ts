import { createContext, useContext } from 'react';
import { ContextError, getErrorMessage } from './getErrorMessage.ts';

export type CustomContextOptions<TContext> = {
	name?: string;
	strict?: boolean;
	hookName?: string;
	providerName?: string;
	errorMessage?: string;
	defaultValue?: TContext | null;
};

const createCustomContext = <TDefaultContext>(options: CustomContextOptions<TDefaultContext>) => {
	const {
		name = 'Unnamed Context',
		hookName = 'Unnamed Context hook',
		providerName = 'Unnamed Provider',
		errorMessage,
		defaultValue,
	} = options;

	const Context = createContext<TDefaultContext | null | undefined>(defaultValue);

	Context.displayName = name;

	const useCustomContext = () => {
		const contextValue = useContext(Context);

		if (contextValue == null) {
			throw new ContextError(errorMessage ?? getErrorMessage(hookName, providerName));
		}

		return contextValue;
	};

	return [Context.Provider, useCustomContext] as const;
};

export { createCustomContext };

