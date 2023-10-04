/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */

// This, is beauty...
(({ age, ...rest }) => rest)({ name: 'a', age: 1, id: 1 });

// This gets input data from a form and returns it in the form of an object instead of a Map. Sexy stuff...
const getFormData = (event: SubmitEvent) => {
	event.preventDefault();
	const data = new FormData(event.target as HTMLFormElement);

	return Object.fromEntries(data.entries());
};

// This is a function that tries to mimick the overloaded crypto.randomInt function
type CallBackFnType = (err: Error | null, value: number) => void;

function randomIntOverload(max: number): number;
function randomIntOverload(min: number, max: number): number;
function randomIntOverload(max: number, callback: (err: Error | null, value: number) => void): void;
function randomIntOverload(
	min: number,
	max: number,
	callback: (err: Error | null, value: number) => void
): void;

function randomIntOverload(...args: (number | CallBackFnType)[]): number | void {
	const HANDLER_LOOKUP = {
		1: ([max]: [number]) => {
			const randomInt = Math.floor(Math.random() * max);

			return randomInt;
		},

		2: ([arg1, arg2]: [number, number | CallBackFnType]) => {
			if (typeof arg2 === 'function') {
				const max = arg1;
				const callbackFn = arg2;
				const randomInt = Math.floor(Math.random() * max);

				callbackFn(null, randomInt);
				return;
			}

			const max = Math.max(arg1, arg2);
			const min = Math.min(arg1, arg2);
			const randomInt = Math.floor(Math.random() * (max - min)) + min;

			return randomInt;
		},

		3: ([min, max, callback]: [number, number, CallBackFnType]) => {
			const randomInt = Math.floor(Math.random() * (max - min)) + min;

			callback(null, randomInt);
		},

		default: () => {
			throw new Error('Invalid number of arguments');
		},
	};

	const selectedHandler = HANDLER_LOOKUP[args.length as keyof typeof HANDLER_LOOKUP];

	return selectedHandler?.(args as never) ?? HANDLER_LOOKUP.default();
}
