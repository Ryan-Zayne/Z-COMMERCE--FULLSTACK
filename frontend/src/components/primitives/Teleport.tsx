import { createPortal } from "react-dom";

type ValidHtmlTags = keyof HTMLElementTagNameMap;
type ValidSelectorAttributes = keyof React.AllHTMLAttributes<HTMLElement> | `data-${string}`;
export type ValidSelector =
	| ValidHtmlTags
	| `#${string}`
	| `.${string}`
	| `data-${string}`
	| `[${ValidSelectorAttributes}='${string}']`
	| `${ValidHtmlTags}[${ValidSelectorAttributes}='${string}']`;

type PortalProps = {
	children: React.ReactNode;
	to?: ValidSelector;
};

function Teleport({ to = "#portal-holder", children }: PortalProps) {
	const teleportDestination = document.querySelector<HTMLElement>(to);

	return createPortal(children, teleportDestination ?? document.body);
}

export default Teleport;
