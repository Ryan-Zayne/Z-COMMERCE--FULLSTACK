import type { InferProps } from "@zayne-labs/toolkit/react/utils";
import { type VariantProps, tv } from "tailwind-variants";
import { Slot } from "./Slot";

export type ButtonProps = InferProps<"button"> &
	VariantProps<typeof button> & {
		asChild?: boolean;
		text?: string;
		unstyled?: boolean;
	};

const button = tv({
	base: "flex items-center justify-center",

	variants: {
		isDisabled: {
			true: "cursor-not-allowed opacity-40",
		},

		size: {
			lg: "px-[4.5rem] py-[1.1rem]",
			md: "px-[3.5rem] py-[1.1rem]",
			sm: "px-[1.3rem] py-[1.1rem]",
		},

		theme: {
			ghost: "text-dark bg-transparent",
			primary: "bg-primary text-white",
			secondary: "bg-secondary text-primary",
		},

		variant: {
			cart: "rounded-[0.8rem]",
			input: "rounded-r-[2.5rem]",
			regular: "rounded-[0.5rem]",
			shop: "rounded-[2.5rem]",
		},
	},

	// eslint-disable-next-line perfectionist/sort-objects
	defaultVariants: {
		size: "md",
		theme: "ghost",
		variant: "regular",
	},
});

function Button(props: ButtonProps) {
	const {
		asChild,
		children,
		className,
		disabled,
		size = "md",
		text,
		theme = "ghost",
		type = "button",
		unstyled,
		variant = "regular",
		...extraButtonProps
	} = props;

	const Component = asChild ? Slot : "button";

	const BTN_CLASSES = !unstyled
		? button({ className, isDisabled: disabled, size, theme, variant })
		: className;

	return (
		<Component type={type} disabled={disabled} className={BTN_CLASSES} {...extraButtonProps}>
			{children ?? text}
		</Component>
	);
}

export default Button;
