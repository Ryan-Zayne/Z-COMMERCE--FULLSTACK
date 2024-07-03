import { Input, Show } from "@/components/primitives";
import { createCustomContext, useElementList, useSlot } from "@/lib/hooks";
import { cnMerge } from "@/lib/utils/cn";
import { useEffect, useId, useMemo, useRef } from "react";
import {
	type Control,
	Controller,
	type FieldValues,
	FormProvider as HookFormProvider,
	type UseFormReturn,
	useFormContext as useHookFormContext,
} from "react-hook-form";

type FormRootProps<TValues extends FieldValues> = React.ComponentPropsWithoutRef<"form"> & {
	methods: UseFormReturn<TValues>;
	children: React.ReactNode;
};

type FormItemProps<TValues extends FieldValues> = {
	control?: Control<TValues>; // == Here for type inference of name prop for the time being
	name: keyof TValues;
	children: React.ReactNode;
	className?: string;
};

type FormErrorMessageProps<TValues extends FieldValues> =
	| {
			type: "regular";
			className?: string;
			control: Control<TValues>;
			errorField: keyof TValues;
	  }
	| {
			type: "root";
			className?: string;
			errorField: string;
	  };

type ContextValue = {
	name: string;
	id: string;
};

const [FormItemProvider, useFormItemContext] = createCustomContext<ContextValue>({
	providerName: "FormItemProvider",
	hookName: "useFormItemContext",
});

function FormRoot<TValues extends FieldValues>(props: FormRootProps<TValues>) {
	const { children, className, methods, ...restOfProps } = props;

	return (
		<HookFormProvider {...methods}>
			<form className={cnMerge("flex flex-col", className)} {...restOfProps}>
				{children}
			</form>
		</HookFormProvider>
	);
}

function FormItem<TValues extends FieldValues>(props: FormItemProps<TValues>) {
	const { children, className, name } = props;

	const uniqueId = useId();

	const value = useMemo(
		() => ({ name: name as string, id: `${String(name)}-(${uniqueId})` }),
		[name, uniqueId]
	);

	return (
		<FormItemProvider value={value}>
			<div className={cnMerge("flex flex-col", className)}>{children}</div>
		</FormItemProvider>
	);
}

function FormLabel({ children, className }: { children: string; className?: string }) {
	const { id } = useFormItemContext();

	return (
		<label htmlFor={id} className={className}>
			{children}
		</label>
	);
}

function FormInputGroup(props: React.ComponentPropsWithRef<"div"> & { displayOtherChildren?: boolean }) {
	const { children, className, displayOtherChildren, ...restOfProps } = props;
	const InputSlot = useSlot(children, FormInput);
	const LeftItemSlot = useSlot(children, FormInputLeftItem);
	const RightItemSlot = useSlot(children, FormInputRightItem);

	return (
		<div className={cnMerge("flex items-center justify-between gap-4", className)} {...restOfProps}>
			{LeftItemSlot}
			{!displayOtherChildren ? InputSlot ?? children : children}
			{RightItemSlot}
		</div>
	);
}

function FormInput(
	props: Omit<React.ComponentPropsWithRef<"input">, "id" | "name"> & { errorClassName?: string }
) {
	const { id, name } = useFormItemContext();
	const { register, formState } = useHookFormContext();

	const { className, errorClassName, ref, ...restOfProps } = props;

	return (
		<Input
			id={id}
			className={cnMerge(formState.errors[name] && errorClassName, className)}
			{...(Boolean(name) && register(name))}
			{...(Boolean(ref) && { ref })}
			{...restOfProps}
		/>
	);
}
FormInput.slot = Symbol.for("input");

function FormInputLeftItem(props: React.ComponentPropsWithRef<"div">) {
	const { children, className, ...restOfProps } = props;

	return (
		<span className={cnMerge("inline-block", className)} {...restOfProps}>
			{children}
		</span>
	);
}
FormInputLeftItem.slot = Symbol.for("leftItem");

// eslint-disable-next-line sonarjs/no-identical-functions
function FormInputRightItem(props: React.ComponentPropsWithRef<"div">) {
	const { children, className, ...restOfProps } = props;

	return (
		<span className={cnMerge("inline-block", className)} {...restOfProps}>
			{children}
		</span>
	);
}
FormInputRightItem.slot = Symbol.for("rightItem");

function FormErrorMessage<TStepData extends FieldValues>(props: FormErrorMessageProps<TStepData>) {
	const { className, errorField, type } = props;

	const { formState } = useHookFormContext();

	const [ErrorMessageList] = useElementList();

	const paragraphRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (!paragraphRef.current) return;

		if (paragraphRef.current.classList.contains("animate-shake")) return;

		paragraphRef.current.classList.add("animate-shake");
	}, [formState.submitCount]);

	const message =
		type === "root"
			? formState.errors.root?.[errorField]?.message
			: (formState.errors[errorField]?.message as string | undefined);

	if (!message) {
		return null;
	}

	const paragraphClasses = "animate-shake pt-[0.3rem] text-[1.1rem] text-error";

	const splitterRegex = /, (?=[A-Z])/;

	const messageArray = message.split(splitterRegex);

	return (
		<Show when={splitterRegex.test(message)}>
			<ErrorMessageList
				each={messageArray}
				render={(messageItem, index) => (
					<p
						className={cnMerge(
							"ml-[1.5rem] list-item",
							paragraphClasses,
							className,
							index === 0 && "mt-[0.4rem]"
						)}
					>
						*{messageItem}
					</p>
				)}
			/>

			<Show.Fallback>
				<p
					ref={paragraphRef}
					className={cnMerge(paragraphClasses, className)}
					onAnimationEnd={() => paragraphRef.current?.classList.remove("animate-shake")}
				>
					*{message}
				</p>
			</Show.Fallback>
		</Show>
	);
}

const Form = {
	Root: FormRoot,
	Item: FormItem,
	Label: FormLabel,
	ErrorMessage: FormErrorMessage,
	Input: FormInput,
	InputGroup: FormInputGroup,
	InputLeftItem: FormInputLeftItem,
	InputRightItem: FormInputRightItem,
	Controller,
};

export default Form;
