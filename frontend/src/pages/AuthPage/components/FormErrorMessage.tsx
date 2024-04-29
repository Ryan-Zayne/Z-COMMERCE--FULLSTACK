import { useElementList } from "@/lib/hooks/useElementList";
import { cnMerge } from "@/lib/utils/cn";
import { useEffect, useRef } from "react";
import type { FieldValues, FormState } from "react-hook-form";

type ErrorParagraphProps<TValues extends FieldValues> =
	| {
			className?: string;
			type: "regular";
			formState: FormState<TValues>;
			errorField: keyof TValues;
	  }
	| {
			className?: string;
			type: "root";
			formState: FormState<TValues>;
			errorField: string;
	  };

function FormErrorMessage<TStepData extends FieldValues>(props: ErrorParagraphProps<TStepData>) {
	const { className, formState, errorField, type } = props;

	const [ErrorMessageList] = useElementList();

	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const paragraphClass = "animate-shake pt-[0.3rem] text-[1.1rem] text-error";

	useEffect(() => {
		if (!paragraphRef.current) return;

		if (paragraphRef.current.classList.contains(paragraphClass)) return;

		paragraphRef.current.classList.add(paragraphClass);
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
			onAnimationEnd={() => paragraphRef.current?.classList.remove(paragraphClass)}
		>
			*{message}
		</p>
	);
}

export default FormErrorMessage;
