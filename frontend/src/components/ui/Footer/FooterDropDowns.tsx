import Logo from '@/components/primitives/Logo.tsx';
import DropDown from '@/components/ui/DropDown.tsx';
import { useDisclosure } from '@/lib/hooks/useDisclosure.ts';
import { cnJoin, cnMerge } from '@/lib/utils/cn.ts';
import { useGlobalStore } from '@/store/zustand/globalStore/globalStore.ts';
import { BsFacebook, BsInstagram, BsPinterest, BsTwitter } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
import { MdLocationOn, MdMail, MdPhone } from 'react-icons/md';
import { TfiYoutube } from 'react-icons/tfi';

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
		<section
			id="DropDown Section"
			data-aos="fade-up"
			data-aos-duration="1200"
			data-aos-delay="250"
			className="flex flex-col gap-[2rem] p-[6rem_1.5rem_4rem] lg:flex-row lg:justify-between lg:px-[4.4rem]"
		>
			<article>
				<Logo className={'dark:brightness-[0.8] dark:contrast-[1.8]'} />

				<DropDown className="mt-[0.7rem]">
					{!isDesktop && (
						<DropDown.Header
							className={'flex cursor-pointer items-center justify-between'}
							onClick={handleDropDowns(dropOne)}
						>
							<h4 className="text-[1.5rem] font-[500]">Contact Us</h4>

							<button
								className={cnJoin(`text-[1.5rem] font-[200] transition-transform duration-300`, {
									'rotate-180': dropOne.isOpen,
								})}
							>
								<FaChevronDown />
							</button>
						</DropDown.Header>
					)}

					<DropDown.Panel
						isOpen={!isDesktop ? dropOne.isOpen : true}
						panelListClasses={semanticClasses.panelList}
					>
						<li className="mt-[1rem] w-[27rem]">
							<MdLocationOn />
							60, 29th Street, San Francisco, CA 94110, United States of America
						</li>
						<li>
							<MdPhone />
							(+00) 123-456-789
						</li>
						<li>
							<MdMail />
							digitalgenie@company.com
						</li>
					</DropDown.Panel>
				</DropDown>

				<DropDown className="mt-[2rem]">
					{!isDesktop && (
						<DropDown.Header
							className={'flex cursor-pointer items-center justify-between'}
							onClick={handleDropDowns(dropTwo)}
						>
							<h4 className="text-[1.5rem] font-[500]">Follow Us</h4>

							<button
								className={cnJoin(`text-[1.5rem] font-[200] transition-transform duration-300`, {
									'rotate-180': dropTwo.isOpen,
								})}
							>
								<FaChevronDown />
							</button>
						</DropDown.Header>
					)}

					<DropDown.Panel
						panelListClasses={
							'flex items-center gap-[2rem] [&_li]:pt-[1.5rem] lg:[&_li]:pb-[1.5rem] pl-[2.5rem] text-[1.7rem]'
						}
						isOpen={isDesktop ? true : dropTwo.isOpen}
					>
						<li>
							<BsFacebook />
						</li>
						<li>
							<BsTwitter />
						</li>
						<li>
							<TfiYoutube />
						</li>
						<li>
							<BsInstagram />
						</li>
						<li>
							<BsPinterest />
						</li>
					</DropDown.Panel>
				</DropDown>
			</article>

			<article>
				{/* eslint-disable-next-line sonarjs/no-duplicate-string */}
				<DropDown className={'min-w-[20rem]'}>
					<DropDown.Header
						className={cnMerge(
							'flex cursor-pointer items-center justify-between text-[1.5rem] lg:text-primary lg:dark:text-heading'
						)}
						onClick={handleDropDowns(dropThree)}
					>
						<h4 className="font-[500] lg:text-[1.8rem]">Information</h4>

						{!isDesktop && (
							<button
								className={cnJoin(`font-[200] transition-transform duration-300`, {
									'rotate-180': dropThree.isOpen,
								})}
							>
								<FaChevronDown />
							</button>
						)}
					</DropDown.Header>

					<DropDown.Panel
						isOpen={isDesktop ? true : dropThree.isOpen}
						panelListClasses={semanticClasses.panelList}
					>
						<li className="mt-[1.2rem] lg:mt-[3rem]">About Us</li>
						<li>Contact Us</li>
						<li>Terms & Conditions</li>
						<li>Returns & Exchanges</li>
						<li>Shipping & Delivery</li>
					</DropDown.Panel>
				</DropDown>
			</article>

			<article>
				<DropDown className={'min-w-[20rem]'}>
					<DropDown.Header
						className={cnMerge(
							'flex cursor-pointer items-center justify-between text-[1.5rem]  lg:text-primary lg:dark:text-heading'
						)}
						onClick={() => handleDropDowns(dropFour)}
					>
						<h4 className={'font-[500] lg:text-[1.8rem]'}>Our Services</h4>

						{!isDesktop && (
							<button
								className={cnJoin(`text-[1.5rem] font-[200] transition-transform duration-300`, {
									'rotate-180': dropFour.isOpen,
								})}
							>
								<FaChevronDown />
							</button>
						)}
					</DropDown.Header>

					<DropDown.Panel
						isOpen={isDesktop ? true : dropFour.isOpen}
						panelListClasses={semanticClasses.panelList}
					>
						<li className="mt-[1.2rem] lg:mt-[3rem]">Your Account</li>
						<li>Return Center</li>
						<li>Purchase App</li>
						<li>Download</li>
						<li>Latest News</li>
					</DropDown.Panel>
				</DropDown>
			</article>

			<article>
				<DropDown className={'min-w-[20rem]'}>
					<DropDown.Header
						className={cnMerge(
							'flex cursor-pointer items-center justify-between text-[1.5rem] lg:text-primary lg:dark:text-heading'
						)}
						onClick={() => handleDropDowns(dropFive)}
					>
						<h4 className="font-[500] lg:text-[1.8rem]">My Account</h4>

						{!isDesktop && (
							<button
								className={cnMerge(`text-[1.5rem] font-[200] transition-transform duration-300`, {
									'rotate-180': dropFive.isOpen,
								})}
							>
								<FaChevronDown />
							</button>
						)}
					</DropDown.Header>

					<DropDown.Panel
						isOpen={isDesktop ? true : dropFive.isOpen}
						panelListClasses={semanticClasses.panelList}
					>
						<li className="mt-[1.2rem] lg:mt-[3rem]">Order History</li>
						<li>Wishlist</li>
						<li>Contact Us</li>
						<li>About Us</li>
						<li>Our Work</li>
					</DropDown.Panel>
				</DropDown>
			</article>
		</section>
	);
}

export default FooterDropDowns;
