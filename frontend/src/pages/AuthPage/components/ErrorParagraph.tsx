import { useElementList } from '@/lib/hooks/useElementList.ts';
import { cnMerge } from '@/lib/utils/cn.ts';

type ErrorTextProps = {
	className?: string;
	message: string | undefined;
};

function ErrorParagraph({ className, message }: ErrorTextProps) {
	const { For: ErrorMessageList } = useElementList();
	const paragraphClasses = 'animate-shake pt-[0.3rem] text-[1.1rem] text-error';
	const splitterRegex = /, (?=[A-Z])/;

	if (message && splitterRegex.test(message)) {
		const messageArray = message.split(splitterRegex);
		return (
			<ErrorMessageList
				each={messageArray}
				render={(messageItem, index) => (
					<p
						className={cnMerge(
							`ml-[1.5rem] list-item ${paragraphClasses}`,
							[className],
							[index === 0 && 'mt-[0.4rem]']
						)}
					>{`${messageItem}.`}</p>
				)}
			/>
		);
	}

	return <p className={paragraphClasses}>{`${message}`}</p>;
}

export default ErrorParagraph;
