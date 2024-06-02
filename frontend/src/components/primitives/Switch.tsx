import { useSlot } from "@/lib/hooks/useSlot";
import { Children, useMemo } from "react";

type ValidSwitchComponentType = React.ReactElement<SwitchCaseProps, "">;

type SwitchProps<TCondition = unknown> = {
	condition?: TCondition;
	children: ValidSwitchComponentType | ValidSwitchComponentType[];
};

type SwitchCaseProps<TWhen = unknown> = {
	when: TWhen;
	children: React.ReactNode;
};

function Switch<TCondition>(props: SwitchProps<TCondition>) {
	const { children, condition = Symbol.for("no-condition") as never } = props;

	const defaultCase = useSlot(children, Default, {
		throwOnMultipleMatch: true,
		errorMessage: "Only one <Switch.Default> component is allowed",
	});

	const matchedCase = useMemo(() => {
		const casesArray = Children.toArray(children) as Extract<SwitchProps["children"], unknown[]>;

		// == Use a symbol to represent the case where no condition is set, and in such case only find matching child via the truthiness of the "when" prop
		return condition === Symbol.for("no-condition")
			? casesArray.find((child) => child.props.when)
			: casesArray.find((child) => child.props.when === condition);
	}, [children, condition]);

	return matchedCase ?? defaultCase;
}

export function Match<TWhen>({ children }: SwitchCaseProps<TWhen>) {
	return children;
}

export function Default({ children }: Pick<SwitchCaseProps, "children">) {
	return children;
}
Default.slot = Symbol.for("fallback");

Switch.Match = Match;
Switch.Default = Default;

export default Switch;
