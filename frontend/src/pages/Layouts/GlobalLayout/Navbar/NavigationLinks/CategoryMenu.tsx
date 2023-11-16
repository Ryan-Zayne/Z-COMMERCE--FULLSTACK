/* eslint-disable consistent-return */
import { DropDown } from '@/components/ui';
import { useDisclosure } from '@/hooks';
import { useGlobalActions, useGlobalStore } from '@/store/zustand/globalStore/globalStore';
import { cnJoin } from '@/utils/cn';
import { useEffect } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { BsChevronDoubleRight, BsMenuButtonFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const categories = [
	{ title: 'All Products', path: 'products' },
	{ title: 'Smartphones', path: 'products/smartphones' },
	{ title: 'Laptops', path: 'products/laptops' },
	{ title: 'Watches', path: 'products/watches' },
	{ title: 'Vehicles', path: 'products/vehicles' },
	{ title: 'Digital Lighting', path: 'products/lighting' },
];

function CategoryMenu({ deviceType }: { deviceType: 'mobile' | 'desktop' }) {
	const href = useLocation().pathname;
	const isDesktop = useGlobalStore((state) => state.isDesktop);
	const { toggleNavShow } = useGlobalActions();

	const categoryDisclosure = useDisclosure({ initialState: isDesktop && href === '/' });

	useEffect(
		function defaultDropDownStateEffect() {
			if (!isDesktop) return;

			if (href === '/') {
				categoryDisclosure.onOpen();
			}

			return () => {
				categoryDisclosure.onClose();
			};
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[href, isDesktop]
	);

	const CategoryList = categories.map((category) => (
		<li
			key={category.title}
			className={`max-lg:hover:text-heading`}
			onClick={!isDesktop ? toggleNavShow : undefined} // To close NavBar on link visit while on mobile
		>
			<Link
				to={category.path}
				className={cnJoin(
					isDesktop &&
						'flex items-center justify-between py-[1rem] [border-bottom:1px_solid_var(--color-primary)]'
				)}
			>
				<p>{category.title}</p>

				{isDesktop && <BsChevronDoubleRight />}
			</Link>
		</li>
	));

	const DEVICE_TYPE_LOOKUP = {
		mobile: () => (
			<DropDown id={'Mobile-Categories dropdown'}>
				<DropDown.Header
					className={'relative flex cursor-pointer items-center gap-[0.5rem]'}
					onClick={categoryDisclosure.onToggle}
				>
					<h4>Categories</h4>

					<button
						className={cnJoin(
							`text-[1.2rem] [transition:transform_350ms_ease]`,
							categoryDisclosure.isOpen && 'rotate-180'
						)}
					>
						<AiOutlineCaretDown />
					</button>
				</DropDown.Header>

				<DropDown.Panel
					isOpen={categoryDisclosure.isOpen}
					panelParentClasses={`absolute inset-x-0 z-[50] m-[0.5rem_2rem_0] rounded-[5px] bg-[hsl(215,19%,35%,0.9)] [backdrop-filter:blur(4rem)]`}
					panelListClasses={cnJoin(`flex flex-col gap-[1.5rem] pl-[3rem] text-[1.4rem]`, [
						categoryDisclosure.isOpen && 'py-[2rem]',
					])}
				>
					{CategoryList}
				</DropDown.Panel>
			</DropDown>
		),

		desktop: () => (
			<DropDown id={'Shop-By-Categories DropDown'} className={'relative z-50 ml-[1rem]'}>
				<DropDown.Header
					className={
						'flex w-[28rem] cursor-pointer flex-row-reverse justify-end gap-[1rem] rounded-[0.5rem_0.5rem_0_0] bg-heading p-[1rem_1.5rem] text-[--color-primary]'
					}
					onClick={categoryDisclosure.onToggle}
				>
					<h3 className="font-[500]">Shop By Category</h3>

					<button className="text-[2rem]">
						<BsMenuButtonFill />
					</button>
				</DropDown.Header>

				<DropDown.Panel
					isOpen={categoryDisclosure.isOpen}
					id="Category List"
					panelParentClasses={'absolute h-[48.5rem] w-full'}
					panelListClasses={cnJoin(
						'bg-body px-[2rem] font-[400] box-shadow-[0_1px_3px_0.3px_var(--color-primary)] dark:box-shadow-[0_1px_3px_0.3px_var(--carousel-dot)]',
						[!categoryDisclosure.isOpen && 'box-shadow-[none]'],
						[categoryDisclosure.isOpen && 'pt-[5rem]']
					)}
				>
					{CategoryList}
				</DropDown.Panel>
			</DropDown>
		),

		default: () => {
			throw new Error(`Case ${deviceType} is unhandled`);
		},
	};

	return DEVICE_TYPE_LOOKUP[deviceType]?.() ?? DEVICE_TYPE_LOOKUP.default();
}

export default CategoryMenu;
