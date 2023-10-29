import { create, type StateCreator } from 'zustand';
import { createGlobalStateSlice } from './slices/globalStateSlice';
import { createMediaQuerySlice } from './slices/mediaQuerySlice';
import type { GlobalStore } from './zustand-store.types';

// State Object creation
const globalStoreObject: StateCreator<GlobalStore> = (...params) => ({
	...createGlobalStateSlice(...params),
	...createMediaQuerySlice(...params),
});

// Store hook creation
export const useGlobalStore = create<GlobalStore>()(globalStoreObject);

// Actions hooks
export const useGlobalActions = () => useGlobalStore((state) => state.globalActions);
export const useMediaQueryActions = () => useGlobalStore((state) => state.mediaQueryActions);
