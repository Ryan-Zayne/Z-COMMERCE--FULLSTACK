/* eslint-disable write-good-comments/write-good-comments */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */

// == This, is beauty...
(({ age, ...rest }) => rest)({ name: 'a', age: 1, id: 1 });

// == This gets input data from a form and returns it in the form of an object instead of a Map. Sexy stuff IMO...
const getFormData = (event: SubmitEvent) => {
	event.preventDefault();
	const data = new FormData(event.target as HTMLFormElement);

	return Object.fromEntries(data.entries());
};

// == This is a function that tries to mimick the overloaded crypto.randomInt function
type CallBackFnType = (err: Error | null, value: number) => void;
const crypto = await import('node:crypto');
function randomIntOverload(max: number): number;
function randomIntOverload(min: number, max: number): number;
function randomIntOverload(max: number, callback: (err: Error | null, value: number) => void): void;
function randomIntOverload(
	min: number,
	max: number,
	callback: (err: Error | null, value: number) => void
): void;

function randomIntOverload(...args: (number | CallBackFnType)[]) {
	const HANDLER_LOOKUP = {
		1: ([max]: [number]) => {
			const randomInt = crypto.randomInt(max);

			return randomInt;
		},

		2: ([arg1, arg2]: [number, number | CallBackFnType]) => {
			if (typeof arg2 === 'function') {
				const max = arg1;
				const callbackFn = arg2;
				const randomInt = crypto.randomInt(max);

				callbackFn(null, randomInt);
				return;
			}

			const max = Math.max(arg1, arg2);
			const min = Math.min(arg1, arg2);
			// const randomInt = Math.floor(Math.random() * (max - min)) + min;
			const randomInt = crypto.randomInt(min, max);

			return randomInt;
		},

		3: ([min, max, callback]: [number, number, CallBackFnType]) => {
			const randomInt = crypto.randomInt(min, max);

			callback(null, randomInt);
		},

		default: () => {
			throw new Error('Invalid number of arguments');
		},
	};

	const selectedHandler = HANDLER_LOOKUP[args.length as keyof typeof HANDLER_LOOKUP];

	return selectedHandler?.(args as never) ?? HANDLER_LOOKUP.default();
}

// == Comparison alternative to avoid timing attacks
const isTargetToken = crypto.timingSafeEqual(Buffer.from('token'), Buffer.from('refreshToken')); // To avoid timing attacks
