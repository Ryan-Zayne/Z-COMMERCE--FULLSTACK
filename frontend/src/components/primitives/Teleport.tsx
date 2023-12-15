import type { WithChildren } from '@/lib/types/global-type-helpers.ts';
import { createPortal } from 'react-dom';

type PortalProps = WithChildren<{
	to?:
		| keyof HTMLElementTagNameMap
		| `#${string}`
		| `.${string}`
		| `[${string}]`
		| `[${string}="${string}"]`;
}>;

function Teleport({ children, to = '#root' }: PortalProps) {
	return createPortal(children, document.querySelector(to) as HTMLElement);
}

export default Teleport;
