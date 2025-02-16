import { Icon, type IconProps } from "@iconify/react";
import { Monicon, type MoniconProps } from "@monicon/react";
import { isString } from "@zayne-labs/toolkit/type-helpers";

export function IconBox(props: IconProps & Omit<MoniconProps, "name"> & { type?: "local" | "online" }) {
	const { icon, type = "online", ...restOfProps } = props;

	if (type === "local" && isString(icon)) {
		return <Monicon name={icon} {...restOfProps} />;
	}

	return <Icon icon={icon} {...restOfProps} />;
}
