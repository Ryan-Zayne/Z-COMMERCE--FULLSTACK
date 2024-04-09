const setAnimationInterval = (callbackFn: () => void, intervalDuration: number | null) => {
	let startTimeStamp: number | null;
	let animationFrameId: number;

	const smoothAnimation = (timeStamp: DOMHighResTimeStamp) => {
		if (!intervalDuration) return;

		if (startTimeStamp === null) {
			startTimeStamp = Math.floor(timeStamp);
		}

		const elapsedTime = Math.floor(timeStamp - startTimeStamp);

		if (elapsedTime >= intervalDuration) {
			callbackFn();
			startTimeStamp = null; // == Reset the starting time stamp
		}

		animationFrameId = requestAnimationFrame(smoothAnimation);
	};

	const onAnimationStart = () => {
		animationFrameId = requestAnimationFrame(smoothAnimation);
	};

	const onAnimationStop = () => {
		cancelAnimationFrame(animationFrameId);
		startTimeStamp = null;
	};

	return { onAnimationStart, onAnimationStop };
};

export { setAnimationInterval };
