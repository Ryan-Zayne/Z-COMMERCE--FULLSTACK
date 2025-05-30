import { IconBox } from "@/components/primitives/IconBox";
import { Logo } from "@/components/primitives/Logo";
import { Overlay } from "@/components/primitives/Overlay";
import { Button } from "@/components/primitives/button";
import { cnJoin } from "@/lib/utils/cn";
import { useGlobalStore } from "@/store/zustand/globalStore";
import type { UnionDiscriminator } from "@zayne-labs/toolkit-type-helpers";
import { getElementList } from "@zayne-labs/ui-react/common/for";
import { Show } from "@zayne-labs/ui-react/common/show";
import { NavLink } from "react-router";
import CategoryMenu from "./CategoryMenu";

type NavItemsType = Array<
	UnionDiscriminator<
		[
			{
				childElement: React.ReactNode;
				className?: string;
				id: number;
				shouldShow: boolean;
			},
			{
				className?: string;
				path: string;
				title: string;
			},
		]
	>
>;

function NavigationLinks() {
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const isNavShow = useGlobalStore((state) => state.isNavShow);
	const { toggleNavShow } = useGlobalStore((state) => state.actions);

	const [NavLinksList] = getElementList("base");

	const navLinkInfoArray: NavItemsType = [
		{
			childElement: <Logo className={"mb-[2rem] ml-[4rem]"} />,
			id: 1,
			shouldShow: !isDesktop,
		},
		{ path: "/", title: "Home" },
		{
			childElement: <CategoryMenu deviceType={"mobile"} />,
			className: "max-lg:pl-[4rem]",
			id: 2,
			shouldShow: !isDesktop,
		},
		{ path: "/products", title: "Products" },
		{ path: "/about", title: "About" },
		{ path: "/contact-us", title: "Contact" },
	];

	return (
		<nav className="relative flex w-full items-center justify-between font-[500] lg:pr-[2rem]">
			{isDesktop && <CategoryMenu deviceType={"desktop"} />}

			<Overlay isOpen={!isDesktop && isNavShow} onClose={toggleNavShow} className="z-[100]" />

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
					<Button
						unstyled={true}
						type="button"
						className={"absolute right-[1rem] top-[2.3rem] text-[3rem] text-rose-600"}
						onClick={toggleNavShow}
					>
						<IconBox icon="ri:close-fill" />
					</Button>
				)}

				<NavLinksList
					each={navLinkInfoArray}
					render={(navLinkInfo) => {
						const { childElement, className, id, path, shouldShow, title } = navLinkInfo;

						if (!path) {
							return (
								<Show.Root when={shouldShow}>
									<li key={id} className={className}>
										{childElement}
									</li>
								</Show.Root>
							);
						}

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
	);
}

export { NavigationLinks };
