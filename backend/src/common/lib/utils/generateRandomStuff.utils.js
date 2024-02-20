import crypto from "node:crypto";

export const generateRandomString = ({ length = 30, stringType = "hex" } = {}) => {
	// Calculate the number of bytes needed to generate a random string of the specified length
	const byteLength = Math.ceil(length / 2);

	const randomBytes = crypto.randomBytes(byteLength);

	const randomString = randomBytes.toString(stringType).slice(0, length);

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
