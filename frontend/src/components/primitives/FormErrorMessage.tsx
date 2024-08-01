import { cnMerge } from "@/lib/utils/cn";
import { useEffect, useRef } from "react";
import { type Control, type FieldValues, useFormState } from "react-hook-form";
import { getElementList } from "./For/getElementList";

type ErrorParagraphProps<TValues extends FieldValues> =
	| {
			type: "regular";
			control: Control<TValues>;
			errorField: keyof TValues;
			className?: string;
	  }
	| {
			type: "root";
			control: Control<TValues>;
			errorField: string;
			className?: string;
	  };

const paragraphClass = "animate-shake pt-[0.3rem] text-[1.1rem] text-error";

function FormErrorMessage<TStepData extends FieldValues>(props: ErrorParagraphProps<TStepData>) {
	const { className, control, errorField, type } = props;

	const formState = useFormState({ control });

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

	const message =
		type === "root"
			? formState.errors.root?.[errorField]?.message
			: (formState.errors[errorField]?.message as string | undefined);

	if (!message) {
		return null;
	}

	const splitterRegex = /, (?=[A-Z])/;

	if (splitterRegex.test(message)) {
		const messageArray = message.split(splitterRegex);

		return (
			<ErrorMessageList
				each={messageArray}
				render={(messageItem, index) => (
					<p
						className={cnMerge(
							`ml-[1.5rem] list-item ${paragraphClass}`,
							className,
							index === 0 && "mt-[0.4rem]"
						)}
					>
						*{messageItem}
					</p>
				)}
			/>
		);
	}

	return (
		<p
			ref={errorParagraphRef}
			className={cnMerge(paragraphClass, className)}
			onAnimationEnd={() => errorParagraphRef.current?.classList.remove("animate-shake")}
		>
			*{message}
		</p>
	);
}

export default FormErrorMessage;
