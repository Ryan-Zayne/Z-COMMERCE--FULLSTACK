import { create, type StateCreator } from 'zustand';
import { createGlobalStateSlice } from './slices/globalStateSlice';
import { createMediaQuerySlice } from './slices/mediaQuerySlice';
import type { GlobalStoreType } from './zustand-store.types';

// State Object creation
const globalStoreObject: StateCreator<GlobalStoreType> = (...params) => ({
	...createGlobalStateSlice(...params),
	...createMediaQuerySlice(...params),
});

// Store hook creation
export const useGlobalStore = create<GlobalStoreType>()(globalStoreObject);

// Actions hooks
export const useGlobalActions = () => useGlobalStore((state) => state.globalActions);
export const useMediaQueryActions = () => useGlobalStore((state) => state.mediaQueryActions);
