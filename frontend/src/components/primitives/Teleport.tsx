import { createPortal } from "react-dom";

type ValidHtmlTags = keyof HTMLElementTagNameMap;
type ValidSelectorAttributes = keyof React.AllHTMLAttributes<HTMLElement> | `data-${string}`;

type PortalProps = {
	children: React.ReactNode;
	to?:
		| ValidHtmlTags
		| `#${string}`
		| `.${string}`
		| `[data-${string}]`
		| `[${ValidSelectorAttributes}='${string}']`
		| `${ValidHtmlTags}[${ValidSelectorAttributes}='${string}']`;
};

function Teleport({ to = "#portal-holder", children }: PortalProps) {
	const teleportDestination = document.querySelector<HTMLElement>(to);

	return createPortal(children, teleportDestination ?? document.body);
}

export default Teleport;
