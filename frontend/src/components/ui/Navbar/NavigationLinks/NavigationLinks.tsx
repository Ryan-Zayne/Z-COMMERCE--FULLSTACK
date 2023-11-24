import Logo from '@/components/primitives/Logo.tsx';
import Overlay from '@/components/primitives/Overlay.tsx';
import { useElementList } from '@/lib/hooks/index.ts';
import { cnMerge } from '@/lib/utils/cn.ts';
import { useGlobalActions, useGlobalStore } from '@/store/zustand/globalStore/globalStore.ts';
import { RiCloseFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import CategoryMenu from './CategoryMenu.tsx';

type NavItemsType = Array<
	| {
			title: string;
			path: string;
			className?: string;
	  }
	| {
			id: number;
			childElement: React.ReactNode;
			shouldShow: boolean;
			className?: string;
	  }
>;

const NavigationLinks = () => {
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const { toggleNavShow } = useGlobalActions();
	const { For: NavLinksList } = useElementList();

	const navLinkInfoArray: NavItemsType = [
		{
			id: 1,
			childElement: <Logo className={'mb-[2rem] ml-[4rem]'} />,
			shouldShow: !isDesktop,
		},
		{ title: 'Home', path: '/' },
		{
			id: 2,
			childElement: <CategoryMenu deviceType={'mobile'} />,
			shouldShow: !isDesktop,
			className: 'max-lg:pl-[4rem]',
		},
		{ title: 'Products', path: '/products' },
		{ title: 'Contact', path: '/contact-us' },
	];

	return (
		<div id="Navigation Links" className="w-full">
			<nav className="relative flex w-[100%] items-center justify-between font-[500] lg:pr-[2rem]">
				{isDesktop && <CategoryMenu deviceType={'desktop'} />}

				<Overlay isOpen={isNavShow} onClose={toggleNavShow} z-index={'z-[80]'} />

				<ul
					id="Navigation List"
					className={cnMerge(
						'relative flex gap-[12rem] [&_>_li_>_a:not(:has(img))]:navlink-transition [&_>_li_>_a.active]:text-brand-inverse [&_>_li_>_a]:relative',
						[
							!isDesktop &&
								'fixed inset-[0_0_0_auto] z-[100] w-[min(22rem,80%)] translate-x-full flex-col gap-[3.2rem] bg-navbar pt-[7rem] text-[1.4rem] text-nav-text transition-transform duration-[250ms] ease-slide-out [backdrop-filter:blur(2rem)_saturate(5)] md:w-[24rem] md:text-[1.6rem]',
						],

						[!isDesktop && isNavShow && 'translate-x-0 duration-[600ms] ease-slide-in']
					)}
				>
					<button
						className={cnMerge('absolute right-[1rem] top-[2.3rem] text-[3rem] text-rose-600')}
						onClick={toggleNavShow}
					>
						<RiCloseFill />
					</button>

					<NavLinksList
						each={navLinkInfoArray}
						render={(navLinkInfo) => {
							if ('shouldShow' in navLinkInfo) {
								const { shouldShow, id, childElement, className } = navLinkInfo;

								return (
									shouldShow && (
										<li key={id} className={className}>
											{childElement}
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