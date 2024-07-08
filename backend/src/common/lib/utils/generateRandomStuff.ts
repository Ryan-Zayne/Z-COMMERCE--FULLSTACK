import crypto from "node:crypto";

export const generateRandomString = (options: { length?: number; encoding?: BufferEncoding }) => {
	const { length = 30, encoding = "hex" } = options;

	const byteLength = Math.ceil(length / 2);

	const randomString = crypto.randomBytes(byteLength).toString(encoding).slice(0, length);

	return randomString;
};

export const generateRandomUUID = ({ length = 15 } = {}) => {
	const randomUUID = crypto.randomUUID().slice(0, length);

	return randomUUID;
};

export const generateRandomInteger = ({ min = 0, max = 100 } = {}) => {
	const randomInteger = crypto.randomInt(min, max);

	return randomInteger;
};
