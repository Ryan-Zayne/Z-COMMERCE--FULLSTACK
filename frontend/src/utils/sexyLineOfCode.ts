// This, is beauty:
(({ age, ...rest }) => rest)({ name: 'a', age: 1, id: 1 });
