import Button from "@/components/primitives/Button";
import { useElementList } from "@/lib/hooks/useElementList";
import { usePresence } from "@/lib/hooks/usePresence";
import { cnJoin } from "@/lib/utils/cn";
import { useThemeStore } from "@/store/zustand/themeStore";
import { Link } from "react-router-dom";

const categories = [
	{
		title: "SmartPhones",
		path: "products/smartphones",
		image: "https://res.cloudinary.com/djvestif4/image/upload/v1685436586/smartphone-transformed_jbfngh_t4v6hj.webp",
		imageAspectRatio: "aspect-[0.83]",
		bgLight: "bg-orange-400",
		bgDark: "bg-[hsl(27,96%,33%)]",
	},
	{
		title: "Laptops",
		path: "products/laptops",
		image: "https://res.cloudinary.com/djvestif4/image/upload/v1685436585/laptop-transformed_dhamlu_dmts1f.webp",
		imageAspectRatio: "aspect-[1.33]",
		bgLight: "bg-gray-400",
		bgDark: "bg-[hsl(200,6%,31%)]",
	},
	{
		title: "Vehicles",
		path: "products/vehicles",
		image: "https://res.cloudinary.com/djvestif4/image/upload/v1685436585/car-transformed_wegeou.webp",
		imageAspectRatio: "aspect-[2.02]",
		bgLight: "bg-purple-400",
		bgDark: "bg-[hsl(270,95%,25%)]",
	},
	{
		title: "Watches",
		path: "products/watches",
		image: "https://res.cloudinary.com/djvestif4/image/upload/v1685436588/watches-transformed_tgsflz.webp",
		imageAspectRatio: "aspect-[1.21]",
		bgLight: "bg-cyan-400",
		bgDark: "bg-[hsl(188,86%,38%)]",
	},
	{
		title: "Digital Lighting",
		path: "products/lighting",
		image: "https://res.cloudinary.com/djvestif4/image/upload/v1685436587/lighting-transformed_bzmi3h.webp",
		imageAspectRatio: "aspect-[1.03]",
		bgLight: "bg-green-300",
		bgDark: "bg-[hsl(151,76%,26%)]",
	},
];

function Categories() {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const { isVisible, isPresent, elementRef, toggleIsShown } = usePresence<HTMLButtonElement>({
		defaultValue: true,
	});
	const [CategoryLinksList] = useElementList();

	return (
		<main id="Categories" className="mt-[6rem] flex flex-col px-[4rem] lg:items-center">
			<h2 className="text-center text-[2.5rem]  font-[600] lg:text-[4rem]">All Categories</h2>

			<CategoryLinksList
				className="mt-[3rem] grid auto-rows-[20rem] grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))] justify-items-center gap-[3rem] lg:auto-rows-[23rem] lg:grid-cols-[repeat(3,_minmax(30rem,1fr))] lg:gap-[4rem]"
				each={categories}
				render={(category) => (
					<li
						key={category.title}
						data-aos="fade-up"
						data-aos-duration="600"
						data-aos-anchor-easing="ease-out"
						className={cnJoin(
							`flex w-[min(100%,27rem)] justify-between gap-[1.5rem] rounded-[5rem] p-[2rem] transition-transform duration-[800ms] ease-in-out hover:scale-[1.09] lg:w-full lg:rounded-[6rem]`,
							[isDarkMode ? category.bgDark : category.bgLight]
						)}
					>
						<div className="flex min-w-[12rem] shrink-0 flex-col justify-center gap-[0.5rem] lg:gap-[1rem]">
							<h3 className="text-center text-[1.8rem] lg:text-[2rem]" onClick={toggleIsShown}>
								{category.title}
							</h3>

							{isPresent && (
								<Button
									ref={elementRef}
									variant={"shop"}
									className={
										"w-full bg-body p-[0.8rem] text-[--text-body]  active:translate-y-[0.15rem] lg:p-[0.8rem_2.7rem] lg:text-[2rem]"
									}
									asChild={true}
								>
									<Link
										to={category.path}
										className={cnJoin(
											"transition-opacity duration-1000",
											isVisible ? "opacity-100" : "opacity-0"
										)}
									>
										Shop Now
									</Link>
								</Button>
							)}
						</div>

						<div className="flex w-[12rem] items-center lg:w-[15rem]">
							<img
								className={category.imageAspectRatio}
								src={category.image}
								loading="lazy"
								alt=""
							/>
						</div>
					</li>
				)}
			/>
		</main>
	);
}
export default Categories;
