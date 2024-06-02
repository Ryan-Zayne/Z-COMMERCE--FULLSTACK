import { useElementList } from "@/lib/hooks";
import { cnMerge } from "@/lib/utils/cn";
import { useEffect, useRef } from "react";
import { type Control, type FieldValues, useFormState } from "react-hook-form";

type ErrorParagraphProps<TValues extends FieldValues> =
	| {
			className?: string;
			type: "regular";
			control: Control<TValues>;
			errorField: keyof TValues;
	  }
	| {
			className?: string;
			type: "root";
			control: Control<TValues>;
			errorField: string;
	  };

const paragraphClass = "animate-shake pt-[0.3rem] text-[1.1rem] text-error";

function FormErrorMessage<TStepData extends FieldValues>(props: ErrorParagraphProps<TStepData>) {
	const { className, control, errorField, type } = props;

	const formState = useFormState({ control });

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
			ref={paragraphRef}
			className={cnMerge(paragraphClass, className)}
			onAnimationEnd={() => paragraphRef.current?.classList.remove("animate-shake")}
		>
			*{message}
		</p>
	);
}

export default FormErrorMessage;
