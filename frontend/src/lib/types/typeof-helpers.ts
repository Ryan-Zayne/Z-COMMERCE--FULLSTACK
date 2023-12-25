export const isObject = <TObject extends Record<string, unknown>>(obj: TObject): obj is TObject => {
	// NOTE - Disabled this rule because TS doesn't know that the type for null is also "object" due to a historical js bug
	/* eslint-disable @typescript-eslint/no-unnecessary-condition */

	return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
};
