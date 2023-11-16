import { Logo } from '@/components/primitives';
import { useElementList } from '@/hooks';
import { useGlobalActions, useGlobalStore } from '@/store/zustand/globalStore/globalStore';
import { cnMerge } from '@/utils/cn';
import { RiCloseFill } from 'react-icons/ri';
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

				{/* HAMBURGER OVERLAY */}
				<div
					onClick={toggleNavShow}
					className={cnMerge(
						`fixed z-[80] w-0 bg-[hsl(0,0%,0%,0.6)] [inset:0_0_0_auto]`,
						isNavShow && 'w-screen'
					)}
				/>

				<ul
					id="Navigation List"
					className={cnMerge(
						'relative flex gap-[12rem] [&_>_li_>_a:not(:has(img))]:navlink-transition [&_>_li_>_a.active]:text-brand-inverse [&_>_li_>_a]:relative',
						[
							!isDesktop &&
								'fixed inset-[0_0_0_auto] z-[100] w-[min(22rem,80%)] translate-x-[100%] flex-col gap-[3.2rem] bg-navbar pt-[7rem] text-[1.4rem] text-nav-text transition-transform duration-[250ms] ease-slide-out [backdrop-filter:blur(2rem)_saturate(5)] md:w-[24rem] md:text-[1.6rem]',
						],

						[!isDesktop && isNavShow && 'translate-x-0 duration-[500ms] ease-slide-in']
					)}
				>
					{!isDesktop && (
						<button
							className={cnMerge(
								'invisible absolute right-[1rem] top-[2.3rem] text-[3rem] text-rose-600 opacity-0',
								[
									isNavShow &&
										'visible animate-[bounce_2.5s_ease-in-out_infinite] opacity-100 [transition:opacity_250ms_ease-in]',
								]
							)}
							onClick={toggleNavShow}
						>
							<RiCloseFill />
						</button>
					)}

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

							const { title, path } = navLinkInfo;

							return (
								<li
									key={title}
									className="max-lg:pl-[4rem]"
									onClick={!isDesktop ? toggleNavShow : undefined}
								>
									<NavLink to={path}>{title}</NavLink>
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
