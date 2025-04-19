// Drawer store types
export type DrawerStore = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	onToggle?: () => void;
};

export type DrawerRootProviderProps = { children: React.ReactNode; value: DrawerStore };

export type DrawerContentProps = Pick<DrawerRootProviderProps, "children"> & {
	className?: string;
	placement?: "left" | "right";
};

export type DrawerCloseProps = Pick<DrawerContentProps, "className"> & { icon?: string };
export type OtherDrawerProps = Omit<DrawerContentProps, "placement">;
