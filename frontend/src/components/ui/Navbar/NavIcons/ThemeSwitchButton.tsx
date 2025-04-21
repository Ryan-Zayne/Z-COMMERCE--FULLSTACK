import { IconBox } from "@/components/primitives/IconBox";
import { Button } from "@/components/primitives/button";
import { cnJoin } from "@/lib/utils/cn";
import { useThemeStore } from "@/store/zustand/themeStore";

function ThemeSwitchButton() {
	const {
		actions: { toggleTheme },
		systemTheme,
		theme,
	} = useThemeStore((state) => state);

	return (
		<Button
			unstyled={true}
			className="rounded-[5rem] bg-[hsl(229,28%,15%)] max-md:scale-[0.8]"
			onClick={toggleTheme}
		>
			<div
				className="relative flex h-[2.2rem] w-[4.3rem] items-center justify-between gap-[0.6rem]
					[padding-block:0.3rem] [padding-inline:0.6rem_0.5rem]"
			>
				<IconBox icon="fa6-solid:sun" className="text-[1.2rem] text-[var(--text-header)]" />

				<IconBox icon="bi:moon-stars-fill" className="text-[1rem] text-[pink]" />

				<span
					className={cnJoin(
						`absolute bottom-[0.37rem] aspect-square w-[1.5rem] rounded-[50%] bg-dark-ball
						transition-transform duration-[300ms] ease-linear`,
						theme === "dark" && "translate-x-[1.75rem]",
						theme === "system" && systemTheme === "dark" && "translate-x-[1.75rem]"
					)}
				/>
			</div>
		</Button>
	);
}

export { ThemeSwitchButton };
