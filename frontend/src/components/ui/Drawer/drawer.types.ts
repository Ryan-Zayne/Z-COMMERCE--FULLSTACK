import type { StoreApi } from 'zustand';

// Drawer store types
export type DrawerStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	onToggle?: () => void;
};
export type DrawerProviderProps = { children: React.ReactNode; storeValues: DrawerStore };
export type DrawerStoreApi = StoreApi<DrawerStore>;

// Drawer component types
export type DrawerProps = Pick<DrawerProviderProps, 'children'> & DrawerStore;

export type DrawerContentProps = Pick<DrawerProviderProps, 'children'> & {
	className?: string;
	placement?: 'left' | 'right';
};

export type DrawerCloseProps = Pick<DrawerContentProps, 'className'> & { icon?: React.ReactNode };
export type OtherDrawerProps = Omit<DrawerContentProps, 'placement'>;
