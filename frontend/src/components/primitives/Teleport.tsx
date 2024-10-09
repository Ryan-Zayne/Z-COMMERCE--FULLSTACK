import { createPortal } from "react-dom";

type ValidHtmlTags = keyof HTMLElementTagNameMap;
type ValidSelectorAttributes = `data-${string}` | keyof React.AllHTMLAttributes<HTMLElement>;
export type ValidSelector =
	| `.${string}`
	| `[${ValidSelectorAttributes}='${string}']`
	| `#${string}`
	| `${ValidHtmlTags}[${ValidSelectorAttributes}='${string}']`
	| `data-${string}`
	| ValidHtmlTags;

type PortalProps = {
	children: React.ReactNode;
	to?: ValidSelector;
};

function Teleport({ children, to = "#portal-holder" }: PortalProps) {
	const teleportDestination = document.querySelector<HTMLElement>(to);

	return createPortal(children, teleportDestination ?? document.body);
}

export default Teleport;
