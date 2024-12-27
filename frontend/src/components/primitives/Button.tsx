import { cnMerge } from "@/lib/utils/cn";
import type { InferProps } from "@zayne-labs/toolkit/react/utils";
import { Slot } from "./Slot";

export type ButtonProps = InferProps<"button"> & {
	asChild?: boolean;
	size?: keyof typeof semanticClasses.sizes;
	text?: string;
	theme?: keyof typeof semanticClasses.themes;
	variant?: keyof typeof semanticClasses.variants;
};

const semanticClasses = {
	base: "flex items-center justify-center",

	sizes: {
		lg: "py-[1.1rem] px-[4.5rem]",
		md: "py-[1.1rem] px-[3.5rem]",
		sm: "py-[1.1rem] px-[1.3rem]",
	},

	themes: {
		ghost: "bg-transparent text-dark",
		primary: "bg-primary text-white",
		secondary: "bg-secondary text-primary",
	},

	variants: {
		cart: "rounded-[0.8rem]",
		input: "rounded-[0_2.5rem_2.5rem_0]",
		regular: "rounded-[0.5rem]",
		shop: "rounded-[2.5rem]",
	},
};

function Button(props: ButtonProps) {
	const {
		asChild,
		children,
		className = "",
		size = "md",
		text,
		theme = "ghost",
		variant = "regular",
		...otherValidBtnProps
	} = props;

	const BTN_CLASSES = cnMerge(
		semanticClasses.base,
		semanticClasses.variants[variant],
		semanticClasses.themes[theme],
		semanticClasses.sizes[size],
		className
	);

	const Component = asChild ? Slot : "button";

	return (
		<Component className={BTN_CLASSES} {...otherValidBtnProps}>
			{children ?? text}
		</Component>
	);
}

export default Button;
