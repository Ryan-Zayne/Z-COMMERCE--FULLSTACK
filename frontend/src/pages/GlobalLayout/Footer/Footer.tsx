/* eslint-disable unicorn/no-array-for-each */
import { DropDown, Logo, SearchForm } from '@/components';
import { useDisclosure } from '@/hooks';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useThemeStore } from '@/store/zustand/themeStore';
import { BsFacebook, BsInstagram, BsPinterest, BsTwitter } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
import { MdLocationOn, MdMail, MdPhone } from 'react-icons/md';
import { TfiYoutube } from 'react-icons/tfi';
import { twJoin, twMerge } from 'tailwind-merge';
import { getOnApple, getOnGoogle, newsLetterIcon } from './images';

function Footer() {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const dropOne = useDisclosure();
	const dropTwo = useDisclosure();
	const dropThree = useDisclosure();
	const dropFour = useDisclosure();
	const dropFive = useDisclosure();

	const handleDropDowns = (selectedDropdown: ReturnType<typeof useDisclosure>) => () => {
		const dropdownsArray = [dropOne, dropTwo, dropThree, dropFour, dropFive];

		dropdownsArray.forEach((dropdown) =>
			dropdown !== selectedDropdown ? dropdown.onClose() : dropdown.onToggle()
		);
	};

	return (
		<footer className="flex flex-col pt-[7rem] lg:pt-[9rem] [&_li:hover]:text-secondary [&_li]:cursor-pointer">
			<section
				data-aos="fade-up"
				data-aos-duration="1000"
				className="flex flex-col bg-slate-900 bg-footer-image bg-cover bg-no-repeat p-[3rem_2rem] [background-position:center] lg:flex-row lg:justify-between lg:px-[clamp(3rem,9vw,18rem)]"
			>
				<div className="flex flex-col items-center gap-[1rem] lg:gap-[2.5rem]">
					<header className="flex items-center">
						<h4 className="text-[1.7rem] font-[500] text-heading lg:text-[2.4rem]">
							Sign Up For NewsLetter
						</h4>

						<img
							className="mr-[0.3rem] aspect-square w-[3rem] lg:w-[4rem]"
							src={newsLetterIcon}
							loading="lazy"
							alt=""
						/>
					</header>

					<p className="text-[1.4rem] lg:text-[1.8rem]">$20 discount for your first order</p>

					<SearchForm
						className={'w-[min(100%,40rem)] lg:w-[45rem]'}
						btnClassName={'p-[0.91rem_1.5rem] text-[1.45rem] font-[500] lg:p-[1.2rem_2.6rem]'}
						inputClassName={'lg:py-[0.9rem]'}
						placeholder={'Enter Your Email address...'}
						text={'Subscribe'}
					/>

					<p className="text-[1.2rem] lg:text-[1.4rem]">Updates on promotions and coupons.</p>
				</div>

				<span className="block bg-carousel-btn max-lg:my-[3rem] max-lg:h-[1px] lg:w-[1px]" />

				<div className="flex flex-col items-center gap-[1rem] lg:gap-[2.5rem]">
					<h4 className="flex items-center text-[1.7rem] font-[500] text-heading lg:text-[2.4rem]">
						Download App On Mobile
					</h4>

					<p className="text-[1.4rem] lg:text-[1.8rem]">15% discount on your first purchase</p>

					<span className="flex gap-[0.5rem] lg:gap-[2rem]">
						<img
							className="h-[4.1rem] w-[14rem] lg:h-[5rem] lg:w-[17rem]"
							src={getOnGoogle}
							alt=""
							loading="lazy"
						/>
						<img
							className="h-[4.1rem] w-[14rem] lg:h-[5rem] lg:w-[17rem]"
							src={getOnApple}
							alt=""
							loading="lazy"
						/>
					</span>

					<span className="flex gap-[2rem] text-[2rem] [&_svg:hover]:text-secondary [&_svg]:cursor-pointer">
						<BsFacebook />
						<BsTwitter />
						<TfiYoutube />
						<BsInstagram />
						<BsPinterest />
					</span>
				</div>
			</section>

			<section
				data-aos="fade-up"
				data-aos-duration="1200"
				data-aos-delay="250"
				className="flex flex-col gap-[2rem] p-[6rem_1.5rem_4rem] lg:flex-row lg:justify-between lg:px-[4.4rem]"
			>
				<article>
					<Logo className={twJoin(isDarkMode && 'brightness-[0.8] contrast-[1.8]')} />

					<DropDown className="mt-[0.7rem]">
						{!isDesktop && (
							<DropDown.Header
								className={'flex cursor-pointer items-center justify-between'}
								onClick={handleDropDowns(dropOne)}
							>
								<h4 className="text-[1.5rem] font-[500]">Contact Us</h4>

								<button
									className={twJoin(
										`text-[1.5rem] font-[200] transition-transform duration-300`,
										dropOne.isOpen && 'rotate-180'
									)}
								>
									<FaChevronDown />
								</button>
							</DropDown.Header>
						)}

						<DropDown.Panel
							isOpen={!isDesktop ? dropOne.isOpen : true}
							panelListClasses={
								'flex flex-col gap-[1rem] pl-[1.5rem] text-[1.4rem] font-[300] lg:font-[400] [&_li]:flex [&_li]:items-center [&_li]:gap-[1rem]'
							}
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
									className={twJoin(
										`text-[1.5rem] font-[200] transition-transform duration-300`,
										dropTwo.isOpen && 'rotate-180'
									)}
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
					<DropDown className={'min-w-[20rem]'}>
						<DropDown.Header
							className={twMerge(
								'flex cursor-pointer items-center justify-between text-[1.5rem] lg:text-primary',
								isDarkMode && 'lg:text-heading'
							)}
							onClick={handleDropDowns(dropThree)}
						>
							<h4 className="font-[500] lg:text-[1.8rem]">Information</h4>

							{!isDesktop && (
								<button
									className={twJoin(
										`font-[200] transition-transform duration-300`,
										dropThree.isOpen && 'rotate-180'
									)}
								>
									<FaChevronDown />
								</button>
							)}
						</DropDown.Header>

						<DropDown.Panel
							isOpen={isDesktop ? true : dropThree.isOpen}
							panelListClasses={
								'flex flex-col gap-[1rem] pl-[1.5rem] text-[1.4rem] font-[300] lg:gap-[1.6rem] lg:pl-0 lg:font-[400]'
							}
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
							className={twMerge(
								'flex cursor-pointer items-center justify-between text-[1.5rem]  lg:text-primary',
								isDarkMode && 'lg:text-heading'
							)}
							onClick={() => handleDropDowns(dropFour)}
						>
							<h4 className={'font-[500] lg:text-[1.8rem]'}>Our Services</h4>

							{!isDesktop && (
								<button
									className={twJoin(
										`text-[1.5rem] font-[200] transition-transform duration-300`,
										dropFour.isOpen && 'rotate-180'
									)}
								>
									<FaChevronDown />
								</button>
							)}
						</DropDown.Header>

						<DropDown.Panel
							isOpen={isDesktop ? true : dropFour.isOpen}
							panelListClasses={
								'flex flex-col gap-[1rem] pl-[1.5rem] text-[1.4rem] font-[300] lg:gap-[1.6rem] lg:pl-0 lg:font-[400]'
							}
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
							className={twMerge(
								'flex cursor-pointer items-center justify-between text-[1.5rem] lg:text-primary',
								isDarkMode && 'lg:text-heading'
							)}
							onClick={() => handleDropDowns(dropFive)}
						>
							<h4 className="font-[500] lg:text-[1.8rem]">My Account</h4>

							{!isDesktop && (
								<button
									className={twMerge(
										`text-[1.5rem] font-[200] transition-transform duration-300`,
										dropFive.isOpen && 'rotate-180'
									)}
								>
									<FaChevronDown />
								</button>
							)}
						</DropDown.Header>

						<DropDown.Panel
							isOpen={isDesktop ? true : dropFive.isOpen}
							panelListClasses={
								'flex flex-col gap-[1rem] pl-[1.5rem] text-[1.4rem] font-[300] lg:gap-[1.6rem] lg:pl-0 lg:font-[400]'
							}
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

			<section className="bg-primary py-[2rem] text-center text-[1.4rem] font-[300] italic text-light">
				<p>Copyright © {new Date().getFullYear()} DigitalGenie</p>
			</section>
		</footer>
	);
}

export default Footer;
