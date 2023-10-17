import type { WithChildren } from '@/lib/global-type-helpers';
import { createPortal } from 'react-dom';

type PortalProps = WithChildren<{
	destination?: 'body' | `#${string}` | `.${string}` | `[${string}="${string}"]`;
}>;

const Portal = ({ children, destination = 'body' }: PortalProps) => {
	return createPortal(children, document.querySelector(destination) as HTMLElement);
};

export default Portal;
