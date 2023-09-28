import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Logo } from '../../../../components';
import { useGlobalActions, useGlobalStore } from '../../../../store/zustand/globalStore';
import CategoryDropDown from './CategoryDropDown';

const NavigationLinks = () => {
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const { toggleNavShow } = useGlobalActions();

	return (
		<div id="Navigation Links" className="w-full">
			<nav className="flex w-[100%] items-center justify-between font-[500] lg:pr-[2rem] ">
				{isDesktop && <CategoryDropDown deviceType={'desktop'} />}

				<ul
					id="Navigation List"
					className={twMerge(
						`flex gap-[12rem] [&_>_li:not(:first-child)_>_a]:navlink-transition [&_>_li_>_a.active]:text-[--brand-inverse] [&_>_li_>_a]:relative`,
						[
							!isDesktop &&
								'fixed z-[100] w-0 flex-col gap-[3.2rem] bg-navbar pt-[7rem] text-[1.4rem] text-nav-text transition-[width] duration-[250ms] ease-[ease] [backdrop-filter:blur(2rem)_saturate(5)] [inset:0_0_0_auto] md:text-[1.6rem]',
						],
						[isNavShow && !isDesktop && 'w-[min(21rem,_80%)] duration-[500ms] md:w-[24rem]']
					)}
				>
					{!isDesktop && (
						<li className="">
							<Logo className={'mb-[2rem] ml-[4rem]'} />
						</li>
					)}

					<li className="max-lg:pl-[4rem]" onClick={!isDesktop ? toggleNavShow : undefined}>
						<NavLink to="/">Home</NavLink>
					</li>

					{!isDesktop && (
						<li className="max-lg:pl-[4rem]">
							<CategoryDropDown deviceType={'mobile'} />
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
