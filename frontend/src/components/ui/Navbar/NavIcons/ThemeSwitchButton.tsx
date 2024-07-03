import { IconBox } from "@/components/primitives/IconBox";
import { cnJoin } from "@/lib/utils/cn";
import { useThemeActions, useThemeStore } from "@/store/zustand/themeStore";

function ThemeSwitchButton({ display = "" }: { display?: string }) {
	const theme = useThemeStore((state) => state.theme);
	const { toggleTheme } = useThemeActions();

	return (
		<button
			className={`rounded-[5rem] bg-[hsl(229,28%,15%)] max-md:scale-[0.8] ${display}`}
			onClick={toggleTheme}
		>
			<div
				className="relative flex h-[2.2rem] w-[4.3rem] items-center justify-between gap-[0.6rem]
					[padding-block:0.3rem] [padding-inline:0.6rem_0.5rem]"
			>
				<IconBox icon="fa6-solid:sun" color="var(--text-header)" fontSize={"1.2rem"} />
				<IconBox icon="bi:moon-stars-fill" color="pink" fontSize={"1rem"} />

				<span
					className={cnJoin(
						`absolute bottom-[0.37rem] aspect-square w-[1.5rem] rounded-[50%] bg-dark-ball
						transition-transform duration-[300ms] ease-linear`,
						theme === "dark" && "translate-x-[1.75rem]"
					)}
				/>
			</div>
		</button>
	);
}

export default ThemeSwitchButton;
