// Drawer store types
export type DrawerStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	onToggle?: () => void;
};
export type DrawerProviderProps = { children: React.ReactNode; storeValues: DrawerStore };

// Drawer component types
export type DrawerRootProps = Pick<DrawerProviderProps, "children"> & DrawerStore;

export type DrawerContentProps = Pick<DrawerProviderProps, "children"> & {
	className?: string;
	placement?: "left" | "right";
};

export type DrawerCloseProps = Pick<DrawerContentProps, "className"> & { icon?: string };
export type OtherDrawerProps = Omit<DrawerContentProps, "placement">;
