import crypto from "node:crypto";

export const generateRandomString = (options: { encoding?: BufferEncoding; length?: number }) => {
	const { encoding = "hex", length = 30 } = options;

	const byteLength = Math.ceil(length / 2);

	const randomString = crypto.randomBytes(byteLength).toString(encoding).slice(0, length);

	return randomString;
};

export const generateRandomUUID = ({ length = 15 } = {}) => {
	const randomUUID = crypto.randomUUID().slice(0, length);

	return randomUUID;
};

export const generateRandomInteger = ({ max = 100, min = 0 } = {}) => {
	const randomInteger = crypto.randomInt(min, max);

	return randomInteger;
};
