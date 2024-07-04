import { IconBox } from "@/components/primitives/IconBox";
import Logo from "@/components/primitives/Logo";
import DropDown from "@/components/ui/DropDown/DropDown";
import { useDisclosure } from "@/lib/hooks/useDisclosure";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { useGlobalStore } from "@/store/zustand/globalStore";
import { m } from "framer-motion";

function FooterDropDowns() {
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const dropOne = useDisclosure();
	const dropTwo = useDisclosure();
	const dropThree = useDisclosure();
	const dropFour = useDisclosure();
	const dropFive = useDisclosure();

	const handleDropDowns = (selectedDropdown: ReturnType<typeof useDisclosure>) => () => {
		const dropdownsArray = [dropOne, dropTwo, dropThree, dropFour, dropFive];

		for (const dropdown of dropdownsArray) {
			dropdown !== selectedDropdown ? dropdown.onClose() : dropdown.onToggle();
		}
	};

	const semanticClasses = {
		panelList: `flex flex-col gap-[1rem] pl-[1.5rem] text-[1.4rem] font-[300] lg:gap-[1.6rem] lg:pl-0 lg:font-[400]`,
	};

	return (
		<m.section
			initial={{ y: 100, opacity: 0 }}
			whileInView={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6 }}
			id="DropDown Section"
			className="flex flex-col gap-[2rem] p-[6rem_1.5rem_4rem] lg:flex-row lg:justify-between
				lg:px-[4.4rem]"
		>
			<article>
				<Logo className={"dark:brightness-[0.8] dark:contrast-[1.8]"} />

				<DropDown.Root className="mt-[0.7rem]">
					{!isDesktop && (
						<DropDown.Trigger
							className={"flex cursor-pointer items-center justify-between"}
							onClick={handleDropDowns(dropOne)}
						>
							<h4 className="text-[1.5rem] font-[500]">Contact Us</h4>

							<button
								className={cnJoin("text-[1.5rem] font-[200] transition-transform duration-300", {
									"rotate-180": dropOne.isOpen,
								})}
							>
								<IconBox icon="fa6-solid:chevron-down" />
							</button>
						</DropDown.Trigger>
					)}

					<DropDown.Panel
						isOpen={!isDesktop ? dropOne.isOpen : true}
						classNames={{ panelList: semanticClasses.panelList }}
					>
						<li className="mt-[1rem] w-[27rem]">
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
					</DropDown.Panel>
				</DropDown.Root>

				<DropDown.Root className="mt-[2rem]">
					{!isDesktop && (
						<DropDown.Trigger
							className={"flex cursor-pointer items-center justify-between"}
							onClick={handleDropDowns(dropTwo)}
						>
							<h4 className="text-[1.5rem] font-[500]">Follow Us</h4>

							<button
								className={cnJoin("text-[1.5rem] font-[200] transition-transform duration-300", {
									"rotate-180": dropTwo.isOpen,
								})}
							>
								<IconBox icon="fa6-solid:chevron-down" />
							</button>
						</DropDown.Trigger>
					)}

					<DropDown.Panel
						classNames={{
							panelList: `flex items-center gap-[2rem] pl-[2.5rem] text-[1.7rem] [&_li]:pt-[1.5rem]
							lg:[&_li]:pb-[1.5rem]`,
						}}
						isOpen={isDesktop ? true : dropTwo.isOpen}
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
					</DropDown.Panel>
				</DropDown.Root>
			</article>

			<article>
				<DropDown.Root className={"min-w-[20rem]"}>
					<DropDown.Trigger
						className={cnMerge(
							`flex cursor-pointer items-center justify-between text-[1.5rem] lg:text-primary
							lg:dark:text-heading`
						)}
						onClick={handleDropDowns(dropThree)}
					>
						<h4 className="font-[500] lg:text-[1.8rem]">Information</h4>

						{!isDesktop && (
							<button
								className={cnJoin("font-[200] transition-transform duration-300", {
									"rotate-180": dropThree.isOpen,
								})}
							>
								<IconBox icon="fa6-solid:chevron-down" />
							</button>
						)}
					</DropDown.Trigger>

					<DropDown.Panel
						isOpen={isDesktop ? true : dropThree.isOpen}
						classNames={{ panelList: semanticClasses.panelList }}
					>
						<li className="mt-[1.2rem] lg:mt-[3rem]">About Us</li>
						<li>Contact Us</li>
						<li>Terms & Conditions</li>
						<li>Returns & Exchanges</li>
						<li>Shipping & Delivery</li>
					</DropDown.Panel>
				</DropDown.Root>
			</article>

			<article>
				<DropDown.Root className={"min-w-[20rem]"}>
					<DropDown.Trigger
						className={cnMerge(
							`flex cursor-pointer items-center justify-between text-[1.5rem] lg:text-primary
							lg:dark:text-heading`
						)}
						onClick={() => handleDropDowns(dropFour)}
					>
						<h4 className={"font-[500] lg:text-[1.8rem]"}>Our Services</h4>

						{!isDesktop && (
							<button
								className={cnJoin("text-[1.5rem] font-[200] transition-transform duration-300", {
									"rotate-180": dropFour.isOpen,
								})}
							>
								<IconBox icon="fa6-solid:chevron-down" />
							</button>
						)}
					</DropDown.Trigger>

					<DropDown.Panel
						isOpen={isDesktop ? true : dropFour.isOpen}
						classNames={{ panelList: semanticClasses.panelList }}
					>
						<li className="mt-[1.2rem] lg:mt-[3rem]">Your Account</li>
						<li>Return Center</li>
						<li>Purchase App</li>
						<li>Download</li>
						<li>Latest News</li>
					</DropDown.Panel>
				</DropDown.Root>
			</article>

			<article>
				<DropDown.Root className={"min-w-[20rem]"}>
					<DropDown.Trigger
						className={cnMerge(
							`flex cursor-pointer items-center justify-between text-[1.5rem] lg:text-primary
							lg:dark:text-heading`
						)}
						onClick={() => handleDropDowns(dropFive)}
					>
						<h4 className="font-[500] lg:text-[1.8rem]">My Account</h4>

						{!isDesktop && (
							<button
								className={cnMerge("text-[1.5rem] font-[200] transition-transform duration-300", {
									"rotate-180": dropFive.isOpen,
								})}
							>
								<IconBox icon="fa6-solid:chevron-down" />
							</button>
						)}
					</DropDown.Trigger>

					<DropDown.Panel
						isOpen={isDesktop ? true : dropFive.isOpen}
						classNames={{ panelList: semanticClasses.panelList }}
					>
						<li className="mt-[1.2rem] lg:mt-[3rem]">Order History</li>
						<li>Wishlist</li>
						<li>Contact Us</li>
						<li>About Us</li>
						<li>Our Work</li>
					</DropDown.Panel>
				</DropDown.Root>
			</article>
		</m.section>
	);
}

export default FooterDropDowns;
