import { cnMerge } from "@/lib/utils/cn";
import { type PolymorphicPropsWithRef, createCustomContext, useToggle } from "@zayne-labs/toolkit/react";
import { getOtherChildren, getSlotElement } from "@zayne-labs/toolkit/react/utils";
import { Fragment as ReactFragment, useEffect, useId, useMemo, useRef } from "react";
import {
	type Control,
	type ControllerFieldState,
	Controller as ControllerPrimitive,
	type ControllerProps,
	type ControllerRenderProps,
	type FieldPath,
	type FormState,
	FormProvider as HookFormProvider,
	type UseFormReturn,
	type UseFormStateReturn,
	useFormState,
	useFormContext as useHookFormContext,
} from "react-hook-form";
import { getElementList } from "./For/getElementList";
import { IconBox } from "./IconBox";
import Show from "./Show";

type FieldValues = Record<string, unknown>;

type FormRootProps<TValues extends FieldValues> = React.ComponentPropsWithoutRef<"form"> & {
	children: React.ReactNode;
	methods: UseFormReturn<TValues>;
};

type ContextValue = {
	name: string;
	uniqueId: string;
};

const [FormItemProvider, useFormItemContext] = createCustomContext<ContextValue>({
	hookName: "useFormItemContext",
	providerName: "FormItemProvider",
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

type FormItemProps<TControl, TFieldValues extends FieldValues> =
	TControl extends Control<infer TValues>
		? {
				children: React.ReactNode;
				className?: string;
				name: keyof TValues;
			}
		: {
				children: React.ReactNode;
				className?: string;
				control?: Control<TFieldValues>;
				name: keyof TFieldValues;
			};

function FormItem<TControl, TFieldValues extends FieldValues = FieldValues>(
	props: FormItemProps<TControl, TFieldValues>
) {
	const { children, className, name } = props;

	const uniqueId = useId();

	const value = useMemo(
		() => ({ name: String(name), uniqueId: `${String(name)}-(${uniqueId})` }),
		[name, uniqueId]
	);

	return (
		<FormItemProvider value={value}>
			<div className={cnMerge("flex flex-col", className)}>{children}</div>
		</FormItemProvider>
	);
}

function FormLabel({ children, className }: { children: string; className?: string }) {
	const { uniqueId } = useFormItemContext();

	return (
		<label htmlFor={uniqueId} className={className}>
			{children}
		</label>
	);
}

function FormInputGroup(props: React.ComponentPropsWithRef<"div">) {
	const { children, className, ...restOfProps } = props;
	const LeftItemSlot = getSlotElement(children, FormInputLeftItem);
	const RightItemSlot = getSlotElement(children, FormInputRightItem);

	const otherChildren = getOtherChildren(children, [FormInputLeftItem, FormInputRightItem]);

	return (
		<div className={cnMerge("flex items-center justify-between", className)} {...restOfProps}>
			{LeftItemSlot}
			{otherChildren}
			{RightItemSlot}
		</div>
	);
}

type FormSideItemProps = {
	children?: React.ReactNode;
	className?: string;
};

function FormInputLeftItem<TElement extends React.ElementType = "span">(
	props: PolymorphicPropsWithRef<TElement, FormSideItemProps>
) {
	const { children, className, ...restOfProps } = props;

	return (
		<span className={cnMerge("inline-flex items-center justify-center", className)} {...restOfProps}>
			{children}
		</span>
	);
}
FormInputLeftItem.slot = Symbol.for("leftItem");

function FormInputRightItem<TElement extends React.ElementType = "span">(
	props: PolymorphicPropsWithRef<TElement, FormSideItemProps>
) {
	const { as: Element = "span", children, className, ...restOfProps } = props;

	return (
		<Element className={cnMerge("inline-flex items-center justify-center", className)} {...restOfProps}>
			{children}
		</Element>
	);
}
FormInputRightItem.slot = Symbol.for("rightItem");

export type FormInputPrimitiveProps<TFieldValues extends FieldValues = FieldValues> = Omit<
	React.ComponentPropsWithRef<"input">,
	"children"
> & {
	classNames?: { input?: string; inputGroup?: string };
	errorClassName?: string;
	name?: keyof TFieldValues;
	withEyeIcon?: boolean;
} & (
		| { control: Control<TFieldValues>; formState?: never }
		| { control?: never; formState?: FormState<TFieldValues> }
	);

const inputTypesWithoutFullWith = new Set<React.HTMLInputTypeAttribute>(["checkbox", "radio"]);

function FormInputPrimitive<TFieldValues extends FieldValues>(
	props: FormInputPrimitiveProps<TFieldValues>
) {
	const contextValues = useFormItemContext();

	const {
		className,
		classNames,
		control,
		errorClassName,
		formState,
		// eslint-disable-next-line react/no-unstable-default-props
		id = contextValues.uniqueId,
		// eslint-disable-next-line react/no-unstable-default-props
		name = contextValues.name,
		type = "text",
		withEyeIcon = true,
		...restOfProps
	} = props;

	const getFormState = (control ? useFormState : () => formState) as typeof useFormState;

	const { errors } = (getFormState({ control }) as UseFormStateReturn<TFieldValues> | undefined) ?? {};

	const [isPasswordVisible, toggleVisibility] = useToggle(false);

	const shouldHaveEyeIcon = withEyeIcon && type === "password";

	const WrapperElement = shouldHaveEyeIcon ? FormInputGroup : ReactFragment;

	const WrapperElementProps = shouldHaveEyeIcon && {
		className: cnMerge("w-full", classNames?.inputGroup, errors?.[name] && errorClassName),
	};

	return (
		<WrapperElement {...WrapperElementProps}>
			<input
				id={id}
				name={name}
				type={type === "password" && isPasswordVisible ? "text" : type}
				className={cnMerge(
					!inputTypesWithoutFullWith.has(type) && "flex w-full",
					`text-sm file:border-0 file:bg-transparent placeholder:text-shadcn-muted-foreground
					focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
					className,
					classNames?.input,
					type !== "password" && errors?.[name] && errorClassName
				)}
				{...restOfProps}
			/>
			<Show when={shouldHaveEyeIcon}>
				<FormInputRightItem
					as="button"
					type="button"
					onClick={toggleVisibility}
					className="size-5 shrink-0 lg:size-6"
				>
					{isPasswordVisible ? (
						<IconBox icon="material-symbols:visibility-off-outline-rounded" className="size-full" />
					) : (
						<IconBox icon="material-symbols:visibility-outline-rounded" className="size-full" />
					)}
				</FormInputRightItem>
			</Show>
		</WrapperElement>
	);
}

function FormInput(props: Omit<FormInputPrimitiveProps, "control" | "formState" | "id" | "name" | "ref">) {
	const { name } = useFormItemContext();
	const { formState, register } = useHookFormContext();

	return (
		<FormInputPrimitive
			name={name}
			formState={formState}
			{...(Boolean(name) && register(name))}
			{...props}
		/>
	);
}

type FormTextAreaPrimitiveProps<TFieldValues extends FieldValues = FieldValues> =
	React.ComponentPropsWithRef<"textarea"> & {
		errorClassName?: string;
		name?: keyof TFieldValues;
	} & (
			| { control: Control<TFieldValues>; formState?: never }
			| { control?: never; formState?: FormState<TFieldValues> }
		);

function FormTextAreaPrimitive<TFieldValues extends FieldValues>(
	props: FormTextAreaPrimitiveProps<TFieldValues>
) {
	const contextValues = useFormItemContext();

	const {
		className,
		control,
		errorClassName,
		formState,
		// eslint-disable-next-line react/no-unstable-default-props
		id = contextValues.uniqueId,
		// eslint-disable-next-line react/no-unstable-default-props
		name = contextValues.name,
		...restOfProps
	} = props;

	const getFormState = (control ? useFormState : () => formState) as typeof useFormState;

	const { errors } = (getFormState({ control }) as UseFormStateReturn<TFieldValues> | undefined) ?? {};

	return (
		<textarea
			id={id}
			name={name}
			className={cnMerge(
				`w-full text-sm placeholder:text-shadcn-muted-foreground focus-visible:outline-none
				disabled:cursor-not-allowed disabled:opacity-50`,
				className,
				name && errors?.[name] && errorClassName
			)}
			{...restOfProps}
		/>
	);
}

function FormTextArea(
	props: Omit<FormTextAreaPrimitiveProps, "control" | "formState" | "id" | "name" | "ref">
) {
	const { name } = useFormItemContext();

	const { formState, register } = useHookFormContext();

	return (
		<FormTextAreaPrimitive
			name={name}
			formState={formState}
			{...(Boolean(name) && register(name))}
			{...props}
		/>
	);
}

type FormControllerProps<TFieldValues> = Omit<
	ControllerProps<FieldValues, FieldPath<FieldValues>>,
	"control" | "name" | "render"
> & {
	render: (props: {
		field: Omit<ControllerRenderProps, "value"> & { value: TFieldValues };
		fieldState: ControllerFieldState;
		formState: UseFormStateReturn<FieldValues>;
	}) => React.ReactElement;
};

function FormController<TFieldValues = never>(props: FormControllerProps<TFieldValues>) {
	const { control } = useHookFormContext<FieldValues, FieldPath<FieldValues>>();
	const { name } = useFormItemContext();

	return (
		<ControllerPrimitive name={name} control={control} {...(props as Omit<ControllerProps, "name">)} />
	);
}

type FormErrorMessageProps<TControl, TFieldValues extends FieldValues> =
	| (TControl extends Control<infer TValues>
			? {
					className?: string;
					errorField: keyof TValues;
					type: "regular";
				}
			: {
					className?: string;
					control?: Control<TFieldValues>; // == Here for type inference of errorField prop
					errorField: keyof TFieldValues;
					type: "regular";
				})
	| {
			className?: string;
			errorField: string;
			type: "root";
	  };

function FormErrorMessage<TControl, TFieldValues extends FieldValues = FieldValues>(
	props: FormErrorMessageProps<TControl, TFieldValues>
) {
	const { className, errorField, type } = props;

	const { formState } = useHookFormContext();

	const [ErrorMessageList] = getElementList();

	const errorParagraphRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (!errorParagraphRef.current) return;

		if (!errorParagraphRef.current.classList.contains("animate-shake")) {
			errorParagraphRef.current.classList.add("animate-shake");
		}

		// Scroll to first error message
		if (Object.keys(formState.errors).indexOf(errorField as string) === 0) {
			errorParagraphRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formState.submitCount]);

	const message = (
		type === "root"
			? formState.errors.root?.[errorField]?.message
			: formState.errors[errorField]?.message
	) as string | string[];

	if (!message) {
		return null;
	}

	const errorParagraphClasses = "animate-shake pt-[0.3rem] text-[1.1rem] text-error";

	return (
		<Show when={Array.isArray(message)}>
			<ErrorMessageList
				each={message as string[]}
				render={(messageItem, index) => (
					<p
						key={messageItem}
						className={cnMerge(
							"ml-[15px] list-item",
							errorParagraphClasses,
							className,
							index === 0 && "mt-1"
						)}
					>
						<span>*</span>
						{messageItem}
					</p>
				)}
			/>

			<Show.Fallback>
				<p
					ref={errorParagraphRef}
					className={cnMerge(errorParagraphClasses, className)}
					onAnimationEnd={() => errorParagraphRef.current?.classList.remove("animate-shake")}
				>
					<span>*</span>
					{message}
				</p>
			</Show.Fallback>
		</Show>
	);
}

export const Root = FormRoot;

export const Item = FormItem;

export const Label = FormLabel;

export const ErrorMessage = FormErrorMessage;

export const Input = FormInput;

export const InputPrimitive = FormInputPrimitive;

export const InputGroup = FormInputGroup;

export const InputLeftItem = FormInputLeftItem;

export const InputRightItem = FormInputRightItem;

export const TextAreaPrimitive = FormTextAreaPrimitive;

export const TextArea = FormTextArea;

export const Controller = FormController;

export { Controller as ControllerPrimitive } from "react-hook-form";
