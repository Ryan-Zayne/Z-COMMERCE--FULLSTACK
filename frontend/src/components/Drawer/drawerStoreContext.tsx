import { useCallbackRef } from '@/hooks';
import { createContext } from '@/hooks/context-hook';
import { useEffect, useMemo, useState } from 'react';
import { createStore, useStore } from 'zustand';
import type { DrawerProviderProps, DrawerStore, DrawerStoreApi } from './drawer.types';

const [Provider, useContext] = createContext<DrawerStoreApi>({
	name: 'DrawerStoreContext',
	hookName: 'useDrawerStore',
	providerName: 'DrawerContextProvider',
	defaultValue: null,
});

const createDrawerStore = () =>
	createStore<DrawerStore>(() => ({
		isOpen: false,
		onOpen: () => {},
		onClose: () => {},
		onToggle: () => {},
	}));

function DrawerContextProvider({ children, storeValues }: DrawerProviderProps) {
	const [drawerStore] = useState(() => createDrawerStore());

	const values = useMemo(() => storeValues, [storeValues]);

	useEffect(() => {
		drawerStore.setState(values);
	}, [drawerStore, values]);

	return <Provider value={drawerStore}>{children}</Provider>;
}

const useDrawerStore = <T,>(callbackFn: (state: DrawerStore) => T) => {
	const store = useContext();
	const selector = useCallbackRef(callbackFn);

	return useStore<DrawerStoreApi, T>(store, selector);
};

export { DrawerContextProvider, useDrawerStore };
