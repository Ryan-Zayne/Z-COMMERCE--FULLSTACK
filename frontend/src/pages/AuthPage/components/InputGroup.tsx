import type { WithChildren } from '@/lib/global-type-helpers';
import { cnMerge } from '@/utils/cn';

type InputGroupProps = WithChildren<{
	className?: string;
}>;

function InputGroup({ children, className }: InputGroupProps) {
	return <div className={cnMerge(`flex flex-col`, className)}>{children}</div>;
}
export default InputGroup;
