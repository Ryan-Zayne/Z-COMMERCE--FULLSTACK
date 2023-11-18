import type { WithChildren } from '@/lib/global-type-helpers.ts';
import { createPortal } from 'react-dom';

type PortalProps = WithChildren<{
	destination?:
		| keyof HTMLElementTagNameMap
		| `#${string}`
		| `.${string}`
		| `[${string}]`
		| `[${string}="${string}"]`;
}>;

function Portal({ children, destination = '#root' }: PortalProps) {
	return createPortal(children, document.querySelector(destination) as HTMLElement);
}

export default Portal;
