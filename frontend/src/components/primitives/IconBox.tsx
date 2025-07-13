import { Icon as IconifyIcon, type IconifyIcon as IconifyIconType, type IconProps } from "@iconify/react";
import { camelCasedProps, getIconDetails, type MoniconProps } from "@monicon/icon-loader";
import type { InferProps } from "@zayne-labs/toolkit-react/utils";
import { isString } from "@zayne-labs/toolkit-type-helpers";
import { useMemo } from "react";

export type MoniconIconBoxProps = Omit<InferProps<"svg">, "strokeWidth">
	& Omit<MoniconProps, "name"> & { icon: MoniconProps["name"]; type?: "local" };

type IconifyIconBoxProps = Omit<IconProps, "icon"> & {
	icon: string | IconifyIconType;
	type: "online";
};

type IconBoxProps = IconifyIconBoxProps | MoniconIconBoxProps;

export function IconBox(props: IconBoxProps) {
	const { icon, type = "local", ...restOfProps } = props;

	switch (type) {
		case "local": {
			if (!isString(icon)) return;
			return <Monicon icon={icon as MoniconProps["name"]} {...(restOfProps as object)} />;
		}

		case "online": {
			return <IconifyIcon icon={icon} {...(restOfProps as object)} />;
		}

		default: {
			throw new Error("Unknown IconType");
		}
	}
}

export function Monicon(props: Omit<MoniconIconBoxProps, "type">) {
	const { color, height = "1em", icon, size, strokeWidth, width = "1em", ...restOfProps } = props;

	const details = useMemo(
		() =>
			getIconDetails({
				color,
				name: icon,
				size,
				strokeWidth,
			}),
		[color, icon, size, strokeWidth]
	);

	const attributes = useMemo(
		() => camelCasedProps(details.attributes) as Record<string, unknown>,
		[details.attributes]
	);

	return (
		<svg
			{...attributes}
			{...restOfProps}
			width={width}
			height={height}
			// eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
			dangerouslySetInnerHTML={{ __html: details.innerHtml }}
		/>
	);
}
