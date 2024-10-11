/* eslint-disable tailwindcss/no-custom-classname */
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { useThemeStore } from "@/store/zustand/themeStore";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getElementList } from "../primitives";

type SkeletonProps = {
	count?: number;
	variant?: "genericPage" | "productItemPage";
};

function LoadingSkeleton({ count = 5, variant = "genericPage" }: SkeletonProps) {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	const [SkeletonCardList] = getElementList();

	const SKELETON_LOOKUP = {
		default: () => {
			throw new Error(`Case ${variant} is unhandled`);
		},

		genericPage: () => (
			<section className="mt-[8rem] flex flex-col gap-[6rem] pt-[6rem]">
				<article className="flex flex-col gap-[3rem] px-[3rem]">
					<SkeletonCardList
						className="grid grid-cols-[repeat(auto-fit,_minmax(23rem,1fr))] justify-items-center
							gap-[3rem_1.5rem]"
						each={[...Array(count).keys()]}
						render={(id) => (
							<li
								key={id}
								className={cnMerge(
									"rounded-[1.2rem w-[min(100%,25rem)] box-shadow-[0_0_3px_hsl(60,_100%,_0%,_0.3)]"
								)}
							>
								<SkeletonTheme
									highlightColor={cnJoin(isDarkMode && "#1e2021")}
									baseColor={cnJoin(isDarkMode && "#232628")}
								>
									<div>
										<Skeleton className={"block h-[18rem] w-full rounded-[0.8rem_0.8rem_0_0]"} />
									</div>

									<div className="px-[1.4rem] pb-[1rem]">
										<header className="flex items-center justify-between gap-[1rem]">
											<Skeleton count={2} width={148} height={6} />
											<span>
												<Skeleton width={58} height={23} />
											</span>
										</header>
										<p className="mt-[2rem]">
											<Skeleton className="gap-[3rem]" count={3} width={"93%"} height={6} />
										</p>
										<div className={"mt-[1rem] flex items-center gap-[1.3rem]"}>
											<Skeleton width={75} height={19} />
											<Skeleton width={34} height={18} />
										</div>
										<Skeleton
											className="mt-[2rem] rounded-[8px] p-[1rem_1.2rem]"
											width={97}
											height={35}
										/>
									</div>
								</SkeletonTheme>
							</li>
						)}
					/>
				</article>
			</section>
		),

		productItemPage: () => (
			<section className="p-[1rem_2rem_3rem] lg:pt-[3rem]">
				<div
					className="mt-[3rem] flex flex-col items-center gap-[4rem] overflow-hidden md:mt-[4.5rem]
						md:h-[47rem] md:flex-row md:items-start md:justify-around md:px-[1rem] lg:mt-[6rem]
						lg:flex-row lg:gap-[8rem]"
				>
					<SkeletonTheme
						highlightColor={cnJoin(isDarkMode && "#1e2021")}
						baseColor={cnJoin(isDarkMode && "#232628")}
					>
						<Skeleton className="h-[35rem] w-[40rem] md:h-[47rem] lg:min-w-[50rem]" />
						<Skeleton className="h-[47rem] w-[46rem] max-md:mx-auto" />
					</SkeletonTheme>
				</div>
			</section>
		),
	};

	return SKELETON_LOOKUP[variant]();
}

export default LoadingSkeleton;
