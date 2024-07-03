import { IconBox } from "@/components/primitives/IconBox";
import Logo from "@/components/primitives/Logo";
import Overlay from "@/components/primitives/Overlay";
import { useElementList } from "@/lib/hooks";
import { cnJoin } from "@/lib/utils/cn";
import { useGlobalActions, useGlobalStore } from "@/store/zustand/globalStore";
import { NavLink } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";

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
	const [NavLinksList] = useElementList("base");

	const navLinkInfoArray: NavItemsType = [
		{
			id: 1,
			childElement: <Logo className={"mb-[2rem] ml-[4rem]"} />,
			shouldShow: !isDesktop,
		},
		{ title: "Home", path: "/" },
		{
			id: 2,
			childElement: <CategoryMenu deviceType={"mobile"} />,
			shouldShow: !isDesktop,
			className: "max-lg:pl-[4rem]",
		},
		{ title: "Products", path: "/products" },
		{ title: "Contact", path: "/contact-us" },
	];

	return (
		<nav className="relative flex w-full items-center justify-between font-[500] lg:pr-[2rem]">
			{isDesktop && <CategoryMenu deviceType={"desktop"} />}

			<Overlay isOpen={!isDesktop && isNavShow} onClose={toggleNavShow} z-index={"z-[100]"} />

			<ul
				id="Navigation List"
				className={cnJoin(
					`flex gap-[3.2rem] [&_>_li_>_a:not(:has(img))]:navlink-transition
					[&_>_li_>_a.active]:text-brand-inverse [&_>_li_>_a]:relative`,

					isDesktop && "relative gap-[12rem]",

					!isDesktop && [
						`fixed inset-[0_0_0_auto] z-[150] w-[min(22rem,80%)] flex-col bg-navbar pt-[7rem]
						text-[1.4rem] text-nav-text transition-transform ease-slide-out
						[backdrop-filter:blur(2rem)_saturate(5)] md:w-[24rem] md:text-[1.6rem]`,

						isNavShow ? "translate-x-0 duration-[600ms]" : "translate-x-full duration-[250ms]",
					]
				)}
			>
				{!isDesktop && (
					<button
						className={"absolute right-[1rem] top-[2.3rem] text-[3rem] text-rose-600"}
						onClick={toggleNavShow}
					>
						<IconBox icon="ri:close-fill" />
					</button>
				)}

				<NavLinksList
					each={navLinkInfoArray}
					render={(navLinkInfo) => {
						if ("shouldShow" in navLinkInfo) {
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
	);
};

export default NavigationLinks;
