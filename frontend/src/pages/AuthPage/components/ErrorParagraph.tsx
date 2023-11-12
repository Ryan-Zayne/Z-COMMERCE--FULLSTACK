import { For as ErrorMessageList } from '@/components/primitives';
import { cnJoin, cnMerge } from '@/lib/utils/cn';

type ErrorTextProps = {
	className?: string;
	message: string | undefined;
};

function ErrorParagraph({ className, message }: ErrorTextProps) {
	const paragraphClasses = cnMerge(`animate-shake pt-[0.3rem] text-[1.1rem] text-error ${className}`);
	const splitterRegex = /, (?=[A-Z])/;

	if (message && splitterRegex.test(message)) {
		const messageArray = message.split(splitterRegex);

		return (
			<ErrorMessageList
				each={messageArray}
				render={(msg, index) => (
					<p
						className={cnJoin(
							`ml-[1.5rem] list-item ${paragraphClasses}`,
							index === 0 && 'mt-[0.4rem]'
						)}
					>{`${msg}.`}</p>
				)}
			/>
		);
	}

	return <p className={paragraphClasses}>{`${message}`}</p>;
}

export default ErrorParagraph;
