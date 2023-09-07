import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = (behavior: ScrollBehavior = 'auto') => {
	const href = useLocation().pathname;

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior,
		});
	}, [href, behavior]);
};

export { useScrollRestoration };
