import { createCustomContext } from "@/lib/hooks";
import type { ForwardedRefType, StateSetter } from "@/lib/type-helpers/global-type-helpers";
import { cnMerge } from "@/lib/utils/cn";
import { forwardRef, useEffect, useId, useMemo, useState } from "react";

type InputGroupProps = {
	children: React.ReactNode;
	className?: string;
};

type ContextValue = {
	setName: StateSetter<string>;
	id: string;
};

const [InputProvider, useInputContext] = createCustomContext<ContextValue>({
	providerName: "InputProvider",
	hookName: "useInputContext",
});

function FormGroup({ children, className }: InputGroupProps) {
	const [name, setName] = useState("");
	const uniqueId = useId();
	const inputDetails = useMemo(() => ({ setName, id: `${name}__${uniqueId}` }), [name, uniqueId]);

	return (
		<InputProvider value={inputDetails}>
			<div className={cnMerge(`flex flex-col`, className)}>{children}</div>
		</InputProvider>
	);
}

const FormLabel = ({ children }: { children: string }) => {
	const { id } = useInputContext();

	return (
		<label htmlFor={id} className="text-label">
			{children}
		</label>
	);
};

const FormInput = (
	props: Omit<React.ComponentPropsWithRef<"input">, "id">,
	ref: ForwardedRefType<HTMLInputElement>
) => {
	const { id, setName } = useInputContext();

	const { className, name, ...restOfProps } = props;

	// == Setting state during render based on props won't work here due to the nature of forwardRef + context for some reason
	useEffect(() => {
		if (!name) return;

		setName(name);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name]);

	return (
		<input
			ref={ref}
			id={id}
			name={name}
			className={cnMerge(
				restOfProps.type !== "checkbox" && [
					"min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot",
				],
				className
			)}
			{...restOfProps}
		/>
	);
};

const Form = {
	Group: FormGroup,
	Label: FormLabel,
	Input: forwardRef(FormInput),
};

export default Form;
