import { Logo } from '@/components';
import { useElementList } from '@/hooks';
import { cnMerge } from '@/lib/utils/cn';
import { useGlobalActions, useGlobalStore } from '@/store/zustand/globalStore/globalStore';
import { NavLink } from 'react-router-dom';
import CategoryMenu from './CategoryMenu';

type NavItemsType = Array<
	| {
			title: string;
			path: string;
			className?: string;
	  }
	| {
			id: number;
			Element: React.ReactNode;
			shouldShow: boolean;
			className?: string;
	  }
>;

const errorMessageDefaults = {
	'/wishlist': 'WishList page still under construction',
	'/contact-us': 'Contact page still under construction',
	'/checkout': 'Checkout page still under construction',
};

const NavigationLinks = () => {
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const { toggleNavShow } = useGlobalActions();
	const { For: NavLinksList } = useElementList();

	const navLinkInfoArray: NavItemsType = [
		{ id: 1, Element: <Logo className={'mb-[2rem] ml-[4rem]'} />, shouldShow: !isDesktop },
		{ title: 'Home', path: '/' },
		{
			id: 2,
			Element: <CategoryMenu deviceType={'mobile'} />,
			shouldShow: !isDesktop,
			className: 'max-lg:pl-[4rem]',
		},
		{ title: 'Products', path: '/products' },
		{ title: 'Contact', path: '/contact-us' },
	];

	return (
		<div id="Navigation Links" className="w-full">
			<nav className="flex w-[100%] items-center justify-between font-[500] lg:pr-[2rem]">
				{isDesktop && <CategoryMenu deviceType={'desktop'} />}

				<ul
					id="Navigation List"
					className={cnMerge(
						'flex gap-[12rem] [&_>_li_>_a:not(:has(img))]:navlink-transition [&_>_li_>_a.active]:text-brand-inverse [&_>_li_>_a]:relative',
						[
							!isDesktop &&
								'fixed bottom-0 right-0 top-0 z-[100] w-[min(21rem,_80%)] translate-x-full flex-col gap-[3.2rem] bg-navbar pt-[7rem] text-[1.4rem] text-nav-text transition-transform duration-[250ms] ease-slide-out [backdrop-filter:blur(2rem)_saturate(5)] md:w-[24rem] md:text-[1.6rem]',
						],

						[!isDesktop && isNavShow && 'translate-x-0 duration-[600ms] ease-slide-in']
					)}
				>
					<NavLinksList
						each={navLinkInfoArray}
						render={(navLinkInfo) => {
							if ('shouldShow' in navLinkInfo) {
								return (
									navLinkInfo.shouldShow && (
										<li key={navLinkInfo.id} className={navLinkInfo.className ?? ''}>
											{navLinkInfo.Element}
										</li>
									)
								);
							}

							return (
								<li
									key={navLinkInfo.title}
									className="max-lg:pl-[4rem]"
									onClick={!isDesktop ? toggleNavShow : undefined}
								>
									<NavLink to={navLinkInfo.path}>{navLinkInfo.title}</NavLink>
								</li>
							);
						}}
					/>
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
