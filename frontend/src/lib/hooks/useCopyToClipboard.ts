import { useState } from "react";
import { copyToClipboard } from "../core/copyToClipboard";

const useCopyToClipboard = () => {
	const [state, setState] = useState("");

	const handleCopy = (value: string) => {
		setState(value);
		void copyToClipboard(value);
	};

	return { copiedValue: state, handleCopy };
};

export { useCopyToClipboard };
