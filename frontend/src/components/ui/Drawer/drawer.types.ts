// Drawer store types
export type DrawerStore = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	onToggle?: () => void;
};
export type DrawerProviderProps = { children: React.ReactNode; storeValues: DrawerStore };

// Drawer component types
export type DrawerRootProps = DrawerStore & Pick<DrawerProviderProps, "children">;

export type DrawerContentProps = Pick<DrawerProviderProps, "children"> & {
	className?: string;
	placement?: "left" | "right";
};

export type DrawerCloseProps = Pick<DrawerContentProps, "className"> & { icon?: string };
export type OtherDrawerProps = Omit<DrawerContentProps, "placement">;
