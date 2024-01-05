import type { WithChildren } from "@/lib/types/global-type-helpers";
import { cnMerge } from "@/lib/utils/cn.ts";

type InputGroupProps = WithChildren<{
	className?: string;
}>;

function InputGroup({ children, className }: InputGroupProps) {
	return <div className={cnMerge(`flex flex-col`, className)}>{children}</div>;
}

export default InputGroup;
