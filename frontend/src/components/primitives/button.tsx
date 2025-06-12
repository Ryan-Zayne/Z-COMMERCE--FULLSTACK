import type { InferProps, PolymorphicProps } from "@zayne-labs/toolkit-react/utils";
import { type VariantProps, tv } from "tailwind-variants";
import { SpinnerIcon } from "../icons";
import { Slot } from "./slot";

export type ButtonProps = InferProps<"button">
	& VariantProps<typeof button> & {
		asChild?: boolean;
		unstyled?: boolean;
	};

const button = tv({
	base: "flex items-center justify-center",

	variants: {
		isDisabled: {
			true: "cursor-not-allowed brightness-50",
		},

		isLoading: {
			true: "grid",
		},

		size: {
			lg: "px-[4.5rem] py-[1.1rem]",
			md: "px-[3.5rem] py-[1.1rem]",
			sm: "px-[1.3rem] py-[1.1rem]",
		},

		theme: {
			ghost: "bg-transparent text-dark",
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

function Button<TElement extends React.ElementType<ButtonProps> = "button">(
	props: PolymorphicProps<TElement, ButtonProps>
) {
	const {
		as: Element = "button",
		asChild,
		children,
		className,
		disabled,
		isDisabled = disabled,
		isLoading,
		size = "md",
		theme,
		type = "button",
		unstyled,
		variant = "regular",
		...extraButtonProps
	} = props;

	const Component = asChild ? Slot.Root : Element;

	const BTN_CLASSES = !unstyled
		? button({ className, isDisabled, isLoading, size, theme, variant })
		: className;

	// == This technique helps prevents content shift when replacing children with spinner icon

	const childrenWithSlottable = (
		<Slot.Slottable>
			<div className="invisible [grid-area:1/1]">{children}</div>
		</Slot.Slottable>
	);

	return (
		<Component type={type} className={BTN_CLASSES} disabled={disabled} {...extraButtonProps}>
			{isLoading ? childrenWithSlottable : children}

			{isLoading && (
				<span className="flex justify-center [grid-area:1/1]">
					<SpinnerIcon className="text-white" />
				</span>
			)}
		</Component>
	);
}

export { Button };
