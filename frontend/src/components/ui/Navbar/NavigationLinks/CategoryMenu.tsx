import { IconBox } from "@/components/primitives/IconBox";
import { DropDown } from "@/components/ui/DropDown";
import { cnJoin } from "@/lib/utils/cn";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useDropdown } from "../../DropDown/dropdown-context";

const categories = [
	{ path: "products", title: "All Products" },
	{ path: "products/smartphones", title: "Smartphones" },
	{ path: "products/laptops", title: "Laptops" },
	{ path: "products/watches", title: "Watches" },
	{ path: "products/vehicles", title: "Vehicles" },
	{ path: "products/lighting", title: "Digital Lighting" },
];

function CategoryMenu({ deviceType }: { deviceType: "desktop" | "mobile" }) {
	const href = useLocation().pathname;
	const isDesktopDevice = deviceType === "desktop";
	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const { toggleNavShow } = useGlobalStore((state) => state.actions);

	const dropdown = useDropdown({ initialState: isDesktopDevice && href === "/" });

	useEffect(() => {
		if (!isDesktopDevice) return;

		const selectedAction = href === "/" ? dropdown.onOpen : dropdown.onClose;

		selectedAction();
	}, [dropdown.onClose, dropdown.onOpen, href, isDesktopDevice]);

	useEffect(() => {
		if (isDesktopDevice) return;

		const onClose = dropdown.onClose;

		!isNavShow && onClose();
	}, [isDesktopDevice, isNavShow, dropdown.onClose]);

	const CategoryList = categories.map((category) => (
		<li
			key={category.title}
			className={"max-lg:hover:text-heading"}
			onClick={!isDesktopDevice ? toggleNavShow : undefined} // To close NavBar on link visit while on mobile
		>
			<Link
				to={category.path}
				className={cnJoin(
					isDesktopDevice
						&& `flex items-center justify-between py-[1rem]
						[border-bottom:1px_solid_theme('colors.primary')]`
				)}
			>
				<p>{category.title}</p>

				{isDesktopDevice && <IconBox icon="bi:chevron-double-right" />}
			</Link>
		</li>
	));

	const DEVICE_TYPE_LOOKUP = {
		desktop: () => (
			<DropDown.RootProvider
				value={dropdown}
				id={"Shop-By-Categories DropDown"}
				className={"relative z-50 ml-[1rem]"}
			>
				<DropDown.Trigger
					className="flex w-[28rem] cursor-pointer flex-row-reverse justify-end gap-[1rem]
						rounded-[0.5rem_0.5rem_0_0] bg-heading p-[1rem_1.5rem] text-primary"
				>
					<h3 className="font-medium">Shop By Category</h3>

					<span className="text-[2rem]">
						<IconBox icon="bi:menu-button-fill" />
					</span>
				</DropDown.Trigger>

				<DropDown.Content
					id="Category List"
					classNames={{
						base: "absolute h-[48.5rem] w-full",
						listContainer: cnJoin(
							`bg-body px-[2rem] shadow-[0_1px_3px_0_theme(colors.primary)]
							dark:shadow-[0_1px_3px_0.3px_theme(colors.carousel-dot)]`,
							dropdown.isOpen ? "pt-[5rem]" : "shadow-none"
						),
					}}
				>
					{CategoryList}
				</DropDown.Content>
			</DropDown.RootProvider>
		),

		mobile: () => (
			<DropDown.RootProvider value={dropdown} id="Mobile-Categories dropdown">
				<DropDown.Trigger className="relative flex cursor-pointer items-center gap-[0.5rem]">
					<h4>Categories</h4>

					<span
						className={cnJoin(
							"text-[1.2rem] [transition:transform_350ms_ease]",
							dropdown.isOpen && "rotate-180"
						)}
					>
						<IconBox icon="basil:caret-down-outline" />
					</span>
				</DropDown.Trigger>

				<DropDown.Content
					classNames={{
						base: `absolute inset-x-0 z-[50] m-[0.5rem_2rem_0] rounded-[5px]
						bg-[hsl(215,19%,35%,0.9)] [backdrop-filter:blur(4rem)]`,

						listContainer: cnJoin(
							"flex flex-col gap-[1.5rem] pl-[3rem] text-[1.4rem]",
							dropdown.isOpen && "py-[2rem]"
						),
					}}
				>
					{CategoryList}
				</DropDown.Content>
			</DropDown.RootProvider>
		),
	};

	return DEVICE_TYPE_LOOKUP[deviceType]();
}

export default CategoryMenu;
