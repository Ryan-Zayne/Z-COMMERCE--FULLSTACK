import { IconBox } from "@/components/primitives/IconBox";
import { Logo } from "@/components/primitives/Logo";
import { Show } from "@/components/primitives/show";
import { DropDown } from "@/components/ui/DropDown";
import { cnJoin } from "@/lib/utils/cn";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { m } from "motion/react";
import { useEffect } from "react";
import { useDropdown } from "../DropDown/dropdown-context";

function FooterDropDowns() {
	const isDesktop = useGlobalStore((state) => state.isDesktop);

	const dropOne = useDropdown();
	const dropTwo = useDropdown();
	const dropThree = useDropdown();
	const dropFour = useDropdown();
	const dropFive = useDropdown();

	const dropdownsArray = [dropOne, dropTwo, dropThree, dropFour, dropFive];

	useEffect(() => {
		if (!isDesktop) return;

		for (const dropdown of dropdownsArray) {
			dropdown.onOpen();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDesktop]);

	useEffect(() => {
		if (isDesktop) return;

		for (const dropdown of dropdownsArray) {
			dropdown.onClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDesktop]);

	const handleDropDowns = (selectedDropdown: ReturnType<typeof useDropdown>) => {
		const onClick = (event: React.MouseEvent) => {
			if (isDesktop) {
				event.preventDefault();
				return;
			}

			for (const dropdown of dropdownsArray) {
				dropdown !== selectedDropdown ? dropdown.onClose() : dropdown.onToggle();
			}
		};

		return onClick;
	};

	const semanticClasses = {
		listContainer: `flex flex-col gap-[1rem] pl-[1.5rem] text-[1.4rem] font-[300] lg:gap-[1.6rem] lg:pl-0 lg:font-[400]`,
	};

	return (
		<m.section
			initial={{ opacity: 0, y: 100 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			id="DropDown Section"
			className="flex flex-col gap-[2rem] p-[6rem_1.5rem_4rem] lg:flex-row lg:justify-between
				lg:px-[4.4rem]"
		>
			<article>
				<Logo className={"dark:brightness-[0.8] dark:contrast-[1.8]"} />

				<DropDown.RootProvider value={dropOne} className="mt-[1rem]">
					<Show.Root when={!isDesktop}>
						<DropDown.Trigger
							className="flex cursor-pointer items-center justify-between"
							onClick={handleDropDowns(dropOne)}
						>
							<h4 className="text-[1.5rem] font-[500]">Contact Us</h4>

							<span
								className={cnJoin(
									"text-[1.5rem] font-[200] transition-transform duration-300",
									dropOne.isOpen && "rotate-180"
								)}
							>
								<IconBox icon="fa6-solid:chevron-down" />
							</span>
						</DropDown.Trigger>
					</Show.Root>

					<DropDown.Content classNames={{ listContainer: semanticClasses.listContainer }}>
						<li className="mt-[1rem]">
							<IconBox icon="mdi:map-marker" />
							60, 29th Street, San Francisco, CA 94110, United States of America
						</li>
						<li>
							<IconBox icon="mdi:phone" />
							(+00) 123-456-789
						</li>
						<li>
							<IconBox icon="mdi:email" />
							digitalgenie@company.com
						</li>
					</DropDown.Content>
				</DropDown.RootProvider>

				<DropDown.RootProvider value={dropTwo} className="mt-[2rem]">
					<Show.Root when={!isDesktop}>
						<DropDown.Trigger
							className="flex cursor-pointer items-center justify-between"
							onClick={handleDropDowns(dropTwo)}
						>
							<h4 className="text-[1.5rem] font-[500]">Follow Us</h4>

							<span
								className={cnJoin(
									"text-[1.5rem] font-[200] transition-transform duration-300",
									dropOne.isOpen && "rotate-180"
								)}
							>
								<IconBox icon="fa6-solid:chevron-down" />
							</span>
						</DropDown.Trigger>
					</Show.Root>

					<DropDown.Content
						classNames={{
							listContainer: `flex items-center gap-[2rem] text-[1.7rem] [&_li]:pt-[1.5rem]
							lg:[&_li]:pb-[1.5rem]`,
						}}
					>
						<li>
							<IconBox icon="bi:facebook" />
						</li>
						<li>
							<IconBox icon="bi:twitter" />
						</li>
						<li>
							<IconBox icon="bi:youtube" />
						</li>
						<li>
							<IconBox icon="bi:instagram" />
						</li>
						<li>
							<IconBox icon="bi:pinterest" />
						</li>
					</DropDown.Content>
				</DropDown.RootProvider>
			</article>

			<article>
				<DropDown.RootProvider value={dropThree} className="min-w-[20rem]">
					<DropDown.Trigger
						className="flex cursor-pointer items-center justify-between text-[1.5rem] lg:text-primary
							lg:dark:text-heading"
						onClick={handleDropDowns(dropThree)}
					>
						<h4 className="font-[500] lg:text-[1.8rem]">Information</h4>

						<Show.Root when={!isDesktop}>
							<span
								className={cnJoin(
									"text-[1.5rem] font-[200] transition-transform duration-300",
									dropThree.isOpen && "rotate-180"
								)}
							>
								<IconBox icon="fa6-solid:chevron-down" />
							</span>
						</Show.Root>
					</DropDown.Trigger>

					<DropDown.Content classNames={{ listContainer: semanticClasses.listContainer }}>
						<li className="mt-[1.2rem] lg:mt-[3rem]">About Us</li>
						<li>Contact Us</li>
						<li>Terms & Conditions</li>
						<li>Returns & Exchanges</li>
						<li>Shipping & Delivery</li>
					</DropDown.Content>
				</DropDown.RootProvider>
			</article>

			<article>
				<DropDown.RootProvider value={dropFour} className="min-w-[20rem]">
					<DropDown.Trigger
						className="flex cursor-pointer items-center justify-between text-[1.5rem] lg:text-primary
							lg:dark:text-heading"
						onClick={handleDropDowns(dropFour)}
					>
						<h4 className="font-[500] lg:text-[1.8rem]">Our Services</h4>

						<Show.Root when={!isDesktop}>
							<span
								className={cnJoin(
									"text-[1.5rem] font-[200] transition-transform duration-300",
									dropOne.isOpen && "rotate-180"
								)}
							>
								<IconBox icon="fa6-solid:chevron-down" />
							</span>
						</Show.Root>
					</DropDown.Trigger>

					<DropDown.Content classNames={{ listContainer: semanticClasses.listContainer }}>
						<li className="mt-[1.2rem] lg:mt-[3rem]">Your Account</li>
						<li>Return Center</li>
						<li>Purchase App</li>
						<li>Download</li>
						<li>Latest News</li>
					</DropDown.Content>
				</DropDown.RootProvider>
			</article>

			<article>
				<DropDown.RootProvider value={dropFive} className="min-w-[20rem]">
					<DropDown.Trigger
						className="flex cursor-pointer items-center justify-between text-[1.5rem] lg:text-primary
							lg:dark:text-heading"
						onClick={handleDropDowns(dropFive)}
					>
						<h4 className="font-[500] lg:text-[1.8rem]">My Account</h4>

						<Show.Root when={!isDesktop}>
							<span
								className={cnJoin(
									"text-[1.5rem] font-[200] transition-transform duration-300",
									dropFive.isOpen && "rotate-180"
								)}
							>
								<IconBox icon="fa6-solid:chevron-down" />
							</span>
						</Show.Root>
					</DropDown.Trigger>

					<DropDown.Content classNames={{ listContainer: semanticClasses.listContainer }}>
						<li className="mt-[1.2rem] lg:mt-[3rem]">Order History</li>
						<li>Wishlist</li>
						<li>Contact Us</li>
						<li>About Us</li>
						<li>Our Work</li>
					</DropDown.Content>
				</DropDown.RootProvider>
			</article>
		</m.section>
	);
}

export { FooterDropDowns };
