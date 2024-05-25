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
	const { children, condition = Symbol("no-condition") as never } = props;

	const defaultCase = useSlot(children, SwitchDefault, {
		throwOnMutipleMatch: true,
		errorMessage: "Only one <Switch.Default> component is allowed",
	});

	const matchedCase = useMemo(() => {
		const casesArray = Children.toArray(children) as Extract<SwitchProps["children"], unknown[]>;

		// == Use a symbol to represent the case where no condition is set, and in such case only find matching child via the truthiness of the "when" prop
		return condition === Symbol.for("no-condtion")
			? casesArray.find((child) => child.props.when)
			: casesArray.find((child) => child.props.when === condition);
	}, [children, condition]);

	return matchedCase ?? defaultCase;
}

function SwitchCase<TWhen>({ children }: SwitchCaseProps<TWhen>) {
	return children;
}

function SwitchDefault({ children }: Pick<SwitchCaseProps, "children">) {
	return children;
}
SwitchDefault.slot = Symbol.for("fallback");

Switch.Case = SwitchCase;
Switch.Default = SwitchDefault;

export default Switch;
