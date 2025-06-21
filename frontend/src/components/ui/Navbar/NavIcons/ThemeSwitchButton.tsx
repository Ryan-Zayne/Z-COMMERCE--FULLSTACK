import { Button } from "@/components/primitives/button";
import { IconBox } from "@/components/primitives/IconBox";
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
			className="rounded-[50px] bg-[hsl(229,28%,15%)] max-md:scale-[0.8]"
			onClick={toggleTheme}
		>
			<div
				className="relative flex h-[22px] w-[43px] items-center justify-between gap-[6px]
					[padding-block:3px] [padding-inline:6px_5px]"
			>
				<IconBox icon="fa6-solid:sun" className="text-[12px] text-[var(--text-header)]" />

				<IconBox icon="bi:moon-stars-fill" className="text-[10px] text-[pink]" />

				<span
					className={cnJoin(
						`absolute bottom-[3.7px] aspect-square w-[15px] rounded-[50%] bg-dark-ball
						transition-transform duration-[300ms] ease-linear`,
						theme === "dark" && "translate-x-[17.5px]",
						theme === "system" && systemTheme === "dark" && "translate-x-[17.5px]"
					)}
				/>
			</div>
		</Button>
	);
}

export { ThemeSwitchButton };
