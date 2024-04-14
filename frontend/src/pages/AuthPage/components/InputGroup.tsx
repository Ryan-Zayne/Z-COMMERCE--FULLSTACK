import { cnMerge } from "@/lib/utils/cn";

type InputGroupProps = {
	children: React.ReactNode;
	className?: string;
};

function InputGroup({ children, className }: InputGroupProps) {
	return <div className={cnMerge(`flex flex-col`, className)}>{children}</div>;
}

export default InputGroup;
