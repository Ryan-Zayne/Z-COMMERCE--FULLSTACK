import { createCustomContext } from '@/lib/hooks/custom-context-hook/index.ts';
import { useEffect, useState } from 'react';
import { createStore } from 'zustand';
import type { DrawerProviderProps, DrawerStore, DrawerStoreApi } from './drawer.types';

const [Provider, useCustomDrawerContext] = createCustomContext<DrawerStoreApi>({
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

export { DrawerContextProvider, useCustomDrawerContext };
