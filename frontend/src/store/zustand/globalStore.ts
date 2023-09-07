import { create, type StateCreator } from 'zustand';
import { createGlobalStateSlice } from './slices/globalStateSlice';
import { createMediaQuerySlice } from './slices/mediaQuerySlice';
import type { GlobalStore } from './zustand-store.types';

const globalStoreObject: StateCreator<GlobalStore> = (...params) => ({
	...createGlobalStateSlice(...params),
	...createMediaQuerySlice(...params),
});

export const useGlobalStore = create<GlobalStore>()(globalStoreObject);

export const useGlobalActions = () => useGlobalStore((state) => state.globalActions);

export const useMediaQueryActions = () => useGlobalStore((state) => state.mediaQueryActions);
