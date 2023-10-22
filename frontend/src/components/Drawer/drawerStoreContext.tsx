import { useCallbackRef } from '@/hooks';
import { createContext } from '@/hooks/context-hook';
import { useEffect, useState } from 'react';
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

	useEffect(
		function initializeStoreEffect() {
			drawerStore.setState(storeValues);
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[storeValues]
	);

	return <Provider value={drawerStore}>{children}</Provider>;
}

const useDrawerStore = <TSlice,>(callbackFn: (state: DrawerStore) => TSlice) => {
	const store = useContext();
	const selector = useCallbackRef(callbackFn);
	const stateSlice = useStore<DrawerStoreApi, TSlice>(store, selector);

	return stateSlice;
};

export { DrawerContextProvider, useDrawerStore };
