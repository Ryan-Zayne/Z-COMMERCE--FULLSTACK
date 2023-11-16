import { useCallbackRef } from '@/hooks';
import { useStore } from 'zustand';
import type { DrawerStore } from '../drawer.types';
import { useCustomDrawerContext } from '../drawerStoreContext';

const useDrawerStore = <TSlice>(callbackFn: (state: DrawerStore) => TSlice) => {
	const store = useCustomDrawerContext();
	const selector = useCallbackRef(callbackFn);

	return useStore(store, selector);
};

export { useDrawerStore };
