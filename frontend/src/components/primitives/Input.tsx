import { cnMerge } from "@/lib/utils/cn";

export type InputProps<TType extends React.HTMLInputTypeAttribute | "textarea"> = TType extends "textarea"
	? React.ComponentPropsWithRef<"textarea"> & { type?: TType }
	: Omit<React.ComponentPropsWithRef<"input">, "type"> & { type?: TType };

function Input<TType extends React.HTMLInputTypeAttribute | "textarea">(props: InputProps<TType>) {
	const { className, type, ...restOfProps } = props;

	const Element = (type === "textarea" ? "textarea" : "input") as string;

	return (
		<Element
			type={type}
			className={cnMerge(
				`placeholder:text-shadcn-muted-foreground flex w-full rounded-md border border-shadcn-input
				text-sm file:border-0 file:bg-transparent focus-visible:outline-none focus-visible:ring-2
				focus-visible:ring-shadcn-ring disabled:cursor-not-allowed disabled:opacity-50`,
				className
			)}
			{...restOfProps}
		/>
	);
}

export default Input;
