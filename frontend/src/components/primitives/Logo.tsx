import { logo } from "@/assets/brand";
import { cnMerge } from "@/lib/utils/cn";
import { useId } from "react";
import { Link } from "react-router-dom";

function Logo({ className = "" }: { className?: string }) {
	const reactId = useId();

	return (
		<Link
			id={`Logo-${reactId}`}
			className={cnMerge(`block h-[4.47rem] w-[13rem] md:h-[5.5rem] md:w-[16rem] ${className}`)}
			to={"/"}
		>
			<img className="h-full" src={logo} alt="" />
		</Link>
	);
}
export default Logo;
