type NoScrollOnOpenOptions = {
	isOpen: boolean;
};

const noScrollOnOpen = (options: NoScrollOnOpenOptions) => {
	const { isOpen } = options;

	if (!isOpen) {
		document.body.style.setProperty('--scrollbar-padding', '');
		document.body.style.setProperty('--overflow-y', '');
		return;
	}

	const scrollbarWidth = (window.innerWidth - document.documentElement.clientWidth) / 10;
	document.body.style.setProperty('--scrollbar-padding', `${scrollbarWidth}rem`);
	document.body.style.setProperty('--overflow-y', 'hidden');
};

export { noScrollOnOpen };
