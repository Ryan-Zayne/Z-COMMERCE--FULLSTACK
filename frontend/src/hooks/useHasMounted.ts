import { useEffect, useState } from 'react';
/*
	Simple hook that will let us know if a
	component has mounted yet.
	Doesn't track unmounts.
*/

const useHasMounted = () => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	return hasMounted;
};

export { useHasMounted };
