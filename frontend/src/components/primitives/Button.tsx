import { cnMerge } from "@/lib/utils/cn";
import { forwardRef } from "react";
import { Slot } from "./Slot";

export type ButtonProps = React.ComponentPropsWithRef<"button"> & {
	asChild?: boolean;
	theme?: keyof typeof semanticClasses.themes;
	variant?: keyof typeof semanticClasses.variants;
	size?: keyof typeof semanticClasses.sizes;
	text?: string;
};

const semanticClasses = {
	base: "flex items-center justify-center",

	variants: {
		regular: "rounded-[0.5rem]",
		input: "rounded-[0_2.5rem_2.5rem_0]",
		cart: "rounded-[0.8rem]",
		shop: "rounded-[2.5rem]",
	},

	themes: {
		primary: "bg-primary text-white",
		secondary: "bg-secondary text-dark",
		ghost: "bg-transparent text-dark",
	},

	sizes: {
		sm: "py-[1.1rem] px-[1.3rem]",
		md: "py-[1.1rem] px-[3.5rem]",
		lg: "py-[1.1rem] px-[4.5rem]",
	},
};

function Button(props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
	const {
		asChild,
		children,
		className = "",
		theme = "ghost",
		variant = "regular",
		size = "md",
		text,
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
		<Component ref={ref} className={BTN_CLASSES} {...otherValidBtnProps}>
			{children ?? text}
		</Component>
	);
}

export default forwardRef(Button);
