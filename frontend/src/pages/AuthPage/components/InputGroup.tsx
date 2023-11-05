import type { WithChildren } from '@/lib/global-type-helpers';
import { twMerge } from 'tailwind-merge';

type InputGroupProps = WithChildren<{
	className?: string;
}>;

function InputGroup({ children, className}: InputGroupProps) {
	return <div className={twMerge(`flex flex-col`, className)}>{children}</div>;
}
export default InputGroup;
