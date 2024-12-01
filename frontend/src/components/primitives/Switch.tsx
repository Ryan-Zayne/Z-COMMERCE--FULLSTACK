
import { getSlotElement } from "@zayne-labs/toolkit/react/utils";
import { isArray } from "@zayne-labs/toolkit/type-helpers";

type ValidSwitchComponentType = React.ReactElement<SwitchMatchProps>;

type SwitchProps<TCondition> = {
	children: ValidSwitchComponentType | ValidSwitchComponentType[];
	condition?: TCondition;
};

type SwitchMatchProps<TWhen = boolean> = {
	children: React.ReactNode;
	when: TWhen;
};

export function Switch<TCondition = true>(props: SwitchProps<TCondition>) {
	const { children, condition = true } = props;

	const defaultCase = getSlotElement(children, Default, {
		errorMessage: "Only one <Switch.Default> component is allowed",
		throwOnMultipleSlotMatch: true,
	});

	const childrenCasesArray = isArray(children) ? children : [children];

	const matchedCase = childrenCasesArray.find((child) => child.props.when === condition);

	return matchedCase ?? defaultCase;
}

export function Match<TWhen>({ children }: SwitchMatchProps<TWhen>) {
	return children;
}

export function Default({ children }: Pick<SwitchMatchProps, "children">) {
	return children;
}
Default.slot = Symbol.for("fallback");

Switch.Match = Match;
Switch.Default = Default;

