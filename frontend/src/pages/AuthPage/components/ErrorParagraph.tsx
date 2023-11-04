import { useElementList } from '@/hooks';
import { twMerge } from 'tailwind-merge';

type ErrorTextProps = {
	className?: string;
	message: string | undefined;
};

function ErrorParagraph({ className, message }: ErrorTextProps) {
	const { For: ErrorMessageList } = useElementList();
	const paragraphClasses = twMerge(`animate-shake pt-[0.3rem] text-[1.1rem] text-error ${className}`);

	if (message?.includes(',')) {
		const splitterRegex = /,(?=[A-Z])/;
		const messageArray = message.split(splitterRegex);

		return (
			<ErrorMessageList
				each={messageArray}
				render={(msg) => <p className={`ml-[1.5rem] list-item ${paragraphClasses}`}>{`${msg}.`}</p>}
			/>
		);
	}

	return <p className={paragraphClasses}>{`${message}`}</p>;
}

export default ErrorParagraph;
