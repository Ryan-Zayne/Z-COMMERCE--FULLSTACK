import type { WithChildren } from '@/lib/global-type-helpers';
import { createPortal } from 'react-dom';

type PortalProps = WithChildren<{
	destination?: HTMLElement;
}>;

const Portal = ({ children, destination = document.body }: PortalProps) => {
	return createPortal(children, destination);
};

export default Portal;
