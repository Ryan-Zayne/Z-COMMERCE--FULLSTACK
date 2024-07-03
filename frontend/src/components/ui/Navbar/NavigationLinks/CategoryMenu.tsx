import { IconBox } from "@/components/primitives/IconBox";
import DropDown from "@/components/ui/DropDown/DropDown";
import { useDisclosure } from "@/lib/hooks";
import { cnJoin } from "@/lib/utils/cn";
import { useGlobalActions, useGlobalStore } from "@/store/zustand/globalStore";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const categories = [
	{ title: "All Products", path: "products" },
	{ title: "Smartphones", path: "products/smartphones" },
	{ title: "Laptops", path: "products/laptops" },
	{ title: "Watches", path: "products/watches" },
	{ title: "Vehicles", path: "products/vehicles" },
	{ title: "Digital Lighting", path: "products/lighting" },
];

function CategoryMenu({ deviceType }: { deviceType: "mobile" | "desktop" }) {
	const href = useLocation().pathname;
	const isDesktopDevice = deviceType === "desktop";

	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const { toggleNavShow } = useGlobalActions();

	const { isOpen, onToggle, onClose, onOpen } = useDisclosure({
		initialState: isDesktopDevice && href === "/",
	});

	useEffect(
		function defaultDropDownStateOnDesktop() {
			if (!isDesktopDevice) return;

			href === "/" ? onOpen() : onClose();
		},

		[href, isDesktopDevice, onClose, onOpen]
	);

	useEffect(
		function closeDropDownOnNavbarClose() {
			if (isDesktopDevice) return;

			!isNavShow && onClose();
		},

		[isDesktopDevice, isNavShow, onClose]
	);

	const CategoryList = categories.map((category) => (
		<li
			key={category.title}
			className={"max-lg:hover:text-heading"}
			onClick={!isDesktopDevice ? toggleNavShow : undefined} // To close NavBar on link visit while on mobile
		>
			<Link
				to={category.path}
				className={cnJoin(
					isDesktopDevice &&
						`flex items-center justify-between py-[1rem]
						[border-bottom:1px_solid_var(--color-primary)]`
				)}
			>
				<p>{category.title}</p>

				{isDesktopDevice && <IconBox icon="bi:chevron-double-right" />}
			</Link>
		</li>
	));

	const DEVICE_TYPE_LOOKUP = {
		mobile: () => (
			<DropDown.Root id={"Mobile-Categories dropdown"}>
				<DropDown.Trigger
					className={"relative flex cursor-pointer items-center gap-[0.5rem]"}
					onClick={onToggle}
				>
					<h4>Categories</h4>

					<button
						className={cnJoin(
							"text-[1.2rem] [transition:transform_350ms_ease]",
							isOpen && "rotate-180"
						)}
					>
						<IconBox icon="basil:caret-down-outline" />
					</button>
				</DropDown.Trigger>

				<DropDown.Panel
					isOpen={isOpen}
					classNames={{
						panelContainer: `absolute inset-x-0 z-[50] m-[0.5rem_2rem_0] rounded-[5px]
						bg-[hsl(215,19%,35%,0.9)] [backdrop-filter:blur(4rem)]`,

						panelList: cnJoin("flex flex-col gap-[1.5rem] pl-[3rem] text-[1.4rem]", [
							isOpen && "py-[2rem]",
						]),
					}}
				>
					{CategoryList}
				</DropDown.Panel>
			</DropDown.Root>
		),

		desktop: () => (
			<DropDown.Root id={"Shop-By-Categories DropDown"} className={"relative z-50 ml-[1rem]"}>
				<DropDown.Trigger
					className={`flex w-[28rem] cursor-pointer flex-row-reverse justify-end gap-[1rem]
						rounded-[0.5rem_0.5rem_0_0] bg-heading p-[1rem_1.5rem] text-[--color-primary]`}
					onClick={onToggle}
				>
					<h3 className="font-[500]">Shop By Category</h3>

					<button className="text-[2rem]">
						<IconBox icon="bi:menu-button-fill" />
					</button>
				</DropDown.Trigger>

				<DropDown.Panel
					isOpen={isOpen}
					id="Category List"
					classNames={{
						panelContainer: "absolute h-[48.5rem] w-full",
						panelList: cnJoin(
							`bg-body px-[2rem] font-[400] box-shadow-[0_1px_3px_0.3px_var(--color-primary)]
							dark:box-shadow-[0_1px_3px_0.3px_var(--carousel-dot)]`,

							isOpen ? "pt-[5rem]" : "box-shadow-[none]"
						),
					}}
				>
					{CategoryList}
				</DropDown.Panel>
			</DropDown.Root>
		),
	};

	return DEVICE_TYPE_LOOKUP[deviceType]();
}

export default CategoryMenu;
