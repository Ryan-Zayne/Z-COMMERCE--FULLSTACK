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

function Teleport({ children, to = '#portal-holder' }: PortalProps) {
	const [hasMounted, setHasMounted] = useState(false);
	const teleportDestination = document.querySelector<HTMLElement>(to);

	if (!hasMounted) {
		setHasMounted(true);
	}

	if (!hasMounted) {
		return null;
	}

	return createPortal(children, teleportDestination ?? document.body);
}

export default Teleport;
