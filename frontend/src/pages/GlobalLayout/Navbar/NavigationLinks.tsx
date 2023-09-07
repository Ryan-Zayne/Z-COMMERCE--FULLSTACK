import { useEffect } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { BsChevronDoubleRight, BsMenuButtonFill } from 'react-icons/bs';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { twJoin, twMerge } from 'tailwind-merge';
import { DropDown, Logo } from '../../../components';
import { useDisclosure } from '../../../hooks';
import { useGlobalActions, useGlobalStore } from '../../../store/zustand/globalStore';
import { useThemeStore } from '../../../store/zustand/themeStore';

const categories = [
	{ title: 'All Products', path: 'all-products' },
	{ title: 'Smartphones', path: 'smartphones' },
	{ title: 'Laptops', path: 'laptops' },
	{ title: 'Watches', path: 'watches' },
	{ title: 'Vehicles', path: 'vehicles' },
	{ title: 'Digital Lighting', path: 'lighting' },
];

const NavigationLinks = () => {
	const href = useLocation().pathname;
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const { toggleNavShow } = useGlobalActions();
	const categoryDisclosure = useDisclosure({ initFn: () => isDesktop && href === '/' });

	// Close Desktop Category Menu on Route that's not the HomePage
	useEffect(() => {
		if (isDesktop && href === '/') {
			categoryDisclosure.onOpen();
		} else {
			categoryDisclosure.onClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [href, isDesktop]);

	const Categories = categories.map((category) => (
		<li
			key={category.title}
			onClick={!isDesktop ? toggleNavShow : undefined}
			className={`max-lg:hover:text-heading`}
		>
			<Link
				className={twJoin(
					isDesktop &&
						'flex items-center justify-between py-[1rem] [border-bottom:1px_solid_var(--color-primary)]'
				)}
				to={category.path}
			>
				<p>{category.title}</p>
				{isDesktop && <BsChevronDoubleRight />}
			</Link>
		</li>
	));

	return (
		<div id="Navigation Links" className="w-full">
			<nav className="flex w-[100%] items-center justify-between font-[500] lg:pr-[2rem] ">
				{isDesktop && (
					<div id="Shop By Categories" className="relative z-50 ml-[1rem]">
						<button
							className="flex w-[28rem] items-center gap-[1rem] rounded-[0.5rem_0.5rem_0_0] bg-heading p-[1rem_1.5rem] font-[500] text-[var(--color-primary)]"
							onClick={categoryDisclosure.onToggle}
						>
							<BsMenuButtonFill className="text-[2rem]" />
							Shop By Category
						</button>

						{/* Desktop CATEGORY LINKS */}
						<DropDown className={'absolute h-[48.5rem] w-full'} isOpen={categoryDisclosure.isOpen}>
							<DropDown.Panel
								id="Category List"
								className={twJoin(
									`bg-body px-[2rem] font-[400] box-shadow-[0_1px_3px_0.3px_var(--color-primary)]`,
									[isDarkMode && 'box-shadow-[0_1px_3px_0.3px_var(--carousel-dot)]'],
									[!categoryDisclosure.isOpen && 'box-shadow-[none]'],
									[categoryDisclosure.isOpen && 'pt-[5rem]']
								)}
							>
								{Categories}
							</DropDown.Panel>
						</DropDown>
					</div>
				)}

				{/* NAVIGATION LINKS */}
				<ul
					id="Navigation List"
					className={twMerge(
						`flex gap-[12rem] [&_>_li_>_a]:navlink-transition [&_>_li_>_a.active]:text-[--brand-inverse] [&_>_li_>_a]:relative`,

						[
							!isDesktop &&
								'fixed z-[100] w-0 flex-col gap-[3.2rem] bg-navbar pt-[7rem] text-[1.4rem] text-nav-text transition-[width] duration-[250ms] ease-[ease] [inset:0_0_0_auto] [backdrop-filter:blur(2rem)_saturate(5)] md:text-[1.6rem]',
						],
						[isNavShow && !isDesktop && 'w-[min(21rem,_80%)] duration-[500ms] md:w-[24rem]']
					)}
				>
					{!isDesktop && (
						<li>
							<Logo className={'mb-[2rem] ml-[4rem]'} />
						</li>
					)}

					<li className="max-lg:pl-[4rem]" onClick={!isDesktop ? toggleNavShow : undefined}>
						<NavLink to="/">Home</NavLink>
					</li>

					{/* MOBILE CATEGORY LINKS */}
					{!isDesktop && (
						<li
							className="relative cursor-pointer max-lg:pl-[4rem]"
							onClick={categoryDisclosure.onToggle}
						>
							<div className="flex items-center gap-[1rem]">
								<h4>Categories</h4>
								<button
									className={twJoin(
										`text-[1.2rem] [transition:transform_350ms_ease]`,
										categoryDisclosure.isOpen && 'rotate-180'
									)}
								>
									<AiOutlineCaretDown />
								</button>
							</div>

							<DropDown
								isOpen={categoryDisclosure.isOpen}
								id={'mobile-categories-dropdown'}
								className={`absolute inset-x-0 z-[50] m-[0.5rem_2rem_0] rounded-[5px] bg-[hsl(215,19%,35%,0.9)] [backdrop-filter:blur(4rem)]`}
							>
								<DropDown.Panel
									className={twJoin(`flex flex-col gap-[1.5rem] pl-[3rem] text-[1.4rem]`, [
										categoryDisclosure.isOpen && 'py-[2rem]',
									])}
								>
									{Categories}
								</DropDown.Panel>
							</DropDown>
						</li>
					)}

					<li className="max-lg:pl-[4rem]" onClick={!isDesktop ? toggleNavShow : undefined}>
						<NavLink to="/all-products">Products</NavLink>
					</li>

					<li className="max-lg:pl-[4rem]" onClick={!isDesktop ? toggleNavShow : undefined}>
						<NavLink to={'/contact'}>Contact</NavLink>
					</li>
				</ul>

				{isDesktop && (
					<p>
						Free shipping on <span>Orders $50</span>
					</p>
				)}
			</nav>
		</div>
	);
};

export default NavigationLinks;
