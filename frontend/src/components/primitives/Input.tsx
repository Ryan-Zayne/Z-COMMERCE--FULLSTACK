import type { ForwardedRefType } from "@/lib/type-helpers";
import { cnMerge } from "@/lib/utils/cn";
import React, { forwardRef } from "react";

export type InputProps<TType extends React.HTMLInputTypeAttribute | "textarea"> = TType extends "textarea"
	? React.ComponentPropsWithRef<"textarea"> & { type?: TType }
	: Omit<React.ComponentPropsWithRef<"input">, "type"> & { type?: TType };

const inputTypesWithoutFullWith = new Set<React.HTMLInputTypeAttribute>(["checkbox", "radio"]);

function Input<TType extends React.HTMLInputTypeAttribute | "textarea">(
	props: InputProps<TType>,
	ref: ForwardedRefType<HTMLElement>
) {
	const { className, type = "text", ...restOfProps } = props;

	const Element = (type === "textarea" ? "textarea" : "input") as string;

	return (
		<Element
			ref={ref}
			type={type}
			className={cnMerge(
				!inputTypesWithoutFullWith.has(type) && "flex w-full",
				`text-sm file:border-0 file:bg-transparent placeholder:text-muted-foreground
				focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
				className
			)}
			{...restOfProps}
		/>
	);
}

const forwardedInput = forwardRef(Input as never);

export default forwardedInput;
