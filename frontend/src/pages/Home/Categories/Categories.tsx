import { Link } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';
import { Button } from '../../../components';
import { useThemeStore } from '../../../store/zustand/themeStore';

const categories = [
	{
		title: 'SmartPhones',
		path: '/smartphones',
		image: 'https://res.cloudinary.com/djvestif4/image/upload/v1685436586/smartphone-transformed_jbfngh_t4v6hj.webp',
		imageAspectRatio: 'aspect-[0.83]',
		bg_light: 'bg-orange-400',
		bg_dark: 'bg-[hsl(27,96%,33%)]',
	},
	{
		title: 'Laptops',
		path: '/laptops',
		image: 'https://res.cloudinary.com/djvestif4/image/upload/v1685436585/laptop-transformed_dhamlu_dmts1f.webp',
		imageAspectRatio: 'aspect-[1.33]',
		bg_light: 'bg-gray-400',
		bg_dark: 'bg-[hsl(200,6%,31%)]',
	},
	{
		title: 'Vehicles',
		path: '/vehicles',
		image: 'https://res.cloudinary.com/djvestif4/image/upload/v1685436585/car-transformed_wegeou.webp',
		imageAspectRatio: 'aspect-[2.02]',
		bg_light: 'bg-purple-400',
		bg_dark: 'bg-[hsl(270,95%,25%)]',
	},
	{
		title: 'Watches',
		path: '/watches',
		image: 'https://res.cloudinary.com/djvestif4/image/upload/v1685436588/watches-transformed_tgsflz.webp',
		imageAspectRatio: 'aspect-[1.21]',
		bg_light: 'bg-cyan-400',
		bg_dark: 'bg-[hsl(188,86%,38%)]',
	},
	{
		title: 'Digital Lighting',
		path: '/lighting',
		image: 'https://res.cloudinary.com/djvestif4/image/upload/v1685436587/lighting-transformed_bzmi3h.webp',
		imageAspectRatio: 'aspect-[1.03]',
		bg_light: 'bg-green-300',
		bg_dark: 'bg-[hsl(151,76%,26%)]',
	},
];

function Categories() {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	const CategoryLinks = categories.map((category) => (
		<li
			key={category.title}
			data-aos="fade-up"
			data-aos-duration="600"
			data-aos-anchor-easing="ease-out"
			className={twJoin(
				`flex w-[min(100%,27rem)] justify-between gap-[1.5rem] rounded-[5rem] p-[2rem] transition-transform duration-[800ms] ease-in-out hover:scale-[1.09] lg:w-full lg:rounded-[6rem]`,
				[isDarkMode ? category.bg_dark : category.bg_light]
			)}
		>
			<div className="flex min-w-[12rem] shrink-0 flex-col justify-center gap-[0.5rem] lg:gap-[1rem]">
				<h3 className="text-center text-[1.8rem] lg:text-[2rem]">{category.title}</h3>
				<Link to={`${category.path}`}>
					<Button
						text={'Shop Now'}
						variant={'shop'}
						className="w-full bg-body p-[0.8rem] text-[--text-body] active:translate-y-[0.15rem] lg:p-[0.8rem_2.7rem] lg:text-[2rem]"
					/>
				</Link>
			</div>
			<div className="flex w-[12rem] items-center lg:w-[15rem]">
				<img className={`${category.imageAspectRatio}`} src={category.image} loading="lazy" alt="" />
			</div>
		</li>
	));

	return (
		<article id="Categories" className="mt-[6rem] flex flex-col px-[4rem] lg:items-center">
			<h2 className="text-center text-[2.5rem] font-[600] lg:text-[4rem]">All Categories</h2>
			<ul className="mt-[3rem] grid auto-rows-[20rem] grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))] justify-items-center gap-[3rem] lg:auto-rows-[23rem] lg:grid-cols-[repeat(3,_minmax(30rem,1fr))] lg:gap-[4rem]">
				{CategoryLinks}
			</ul>
		</article>
	);
}
export default Categories;
