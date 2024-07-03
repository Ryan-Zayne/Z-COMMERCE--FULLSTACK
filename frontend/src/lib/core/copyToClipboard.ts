const fallBackCopy = (text: string) => {
	const tempTextArea = document.createElement("textarea");
	tempTextArea.value = text;
	document.body.append(tempTextArea);
	tempTextArea.select();
	document.execCommand("copy");
	tempTextArea.remove();
};

// Copy to clipboard feature
const copyToClipboard = async (text: string) => {
	if (text === "") return;

	try {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!navigator?.clipboard?.writeText) {
			throw new Error("writeText not supported");
		}

		await navigator.clipboard.writeText(text);
	} catch (error) {
		console.error("Copy to clipboard failed", error);
		fallBackCopy(text);
	}
};

export { copyToClipboard };
