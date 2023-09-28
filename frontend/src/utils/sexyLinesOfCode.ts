/* eslint-disable @typescript-eslint/no-unused-vars */

// This, is beauty...
(({ age, ...rest }) => rest)({ name: 'a', age: 1, id: 1 });

// This gets input data from a form and returns it in the form of an object instead of a Map. Sexy stuff...
const getFormData = (event: SubmitEvent) => {
	event.preventDefault();
	const data = new FormData(event.target as HTMLFormElement);

	return Object.fromEntries(data.entries());
};
