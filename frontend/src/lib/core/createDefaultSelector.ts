// prettier-ignore
const createDefaultSelector = <TValue, TSlice = TValue>() => ((store: TValue) => store as unknown as TSlice)

export { createDefaultSelector };
