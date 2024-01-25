import type { WithChildren } from "@/lib/type-helpers/global-type-helpers";
import { cnMerge } from "@/lib/utils/cn";

type InputGroupProps = WithChildren<{
	className?: string;
}>;

function InputGroup({ children, className }: InputGroupProps) {
	return <div className={cnMerge(`flex flex-col`, className)}>{children}</div>;
}

export default InputGroup;
