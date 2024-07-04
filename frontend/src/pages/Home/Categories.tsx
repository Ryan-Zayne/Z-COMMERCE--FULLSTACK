import Button from "@/components/primitives/Button";
import { useElementList } from "@/lib/hooks/useElementList";
import { cnJoin } from "@/lib/utils/cn";
import { useThemeStore } from "@/store/zustand/themeStore";
import { m } from "framer-motion";
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

	const [CategoryLinksList] = useElementList();

	return (
		<main id="Categories" className="mt-[6rem] flex flex-col px-[4rem] lg:items-center">
			<h2 className="text-center text-[2.5rem] font-[600] lg:text-[4rem]">All Categories</h2>

			<CategoryLinksList
				className="mt-[3rem] grid auto-rows-[20rem] grid-cols-[repeat(auto-fit,_minmax(24rem,1fr))]
					justify-items-center gap-[3rem] lg:auto-rows-[23rem]
					lg:grid-cols-[repeat(3,_minmax(30rem,1fr))] lg:gap-[4rem]"
				each={categories}
				render={(category) => (
					<m.li
						key={category.title}
						initial={{ y: 50, opacity: 0, scale: 0.8 }}
						whileInView={{
							y: 0,
							opacity: 1,
							scale: 1,
							transition: { ease: "easeInOut", duration: 0.6 },
						}}
						viewport={{ margin: "-40px" }}
						whileHover={{ scale: 1.09, transition: { duration: 0.3 } }}
						className={cnJoin(
							`flex w-[min(100%,27rem)] justify-between gap-[1.5rem] rounded-[5rem] p-[2rem]
							lg:w-full lg:rounded-[6rem]`,
							[isDarkMode ? category.bgDark : category.bgLight]
						)}
					>
						<div
							className="flex min-w-[12rem] shrink-0 flex-col justify-center gap-[0.5rem]
								lg:gap-[1rem]"
						>
							<h3 className="text-center text-[1.8rem] lg:text-[2rem]">{category.title}</h3>

							<Button
								variant={"shop"}
								className={`w-full bg-body p-[0.8rem] text-[--text-body]
								active:translate-y-[0.15rem] lg:p-[0.8rem_2.7rem] lg:text-[2rem]`}
								asChild={true}
							>
								<Link to={category.path}>Shop Now</Link>
							</Button>
						</div>

						<div className="flex w-[12rem] items-center lg:w-[15rem]">
							<img
								className={category.imageAspectRatio}
								src={category.image}
								loading="lazy"
								alt=""
							/>
						</div>
					</m.li>
				)}
			/>
		</main>
	);
}
export default Categories;
