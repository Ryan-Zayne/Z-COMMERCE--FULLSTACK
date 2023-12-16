import type { WithChildren } from '@/lib/types/global-type-helpers.ts';
import { useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = WithChildren<{
	to?:
		| keyof HTMLElementTagNameMap
		| `#${string}`
		| `.${string}`
		| `[${string}]`
		| `[${string}="${string}"]`;
}>;

function Teleport({ children, to = '#portal-container' }: PortalProps) {
	const teleportDestination = document.querySelector<HTMLElement>(to);
	const [hasMounted, setHasMounted] = useState(false);

	if (!hasMounted) {
		setHasMounted(true);
	}

	if (!hasMounted || !teleportDestination) {
		return null;
	}

	return createPortal(children, teleportDestination);
}

export default Teleport;
