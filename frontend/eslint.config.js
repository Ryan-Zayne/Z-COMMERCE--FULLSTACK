import { zayne } from "@zayne-labs/eslint-config";

export default zayne({
	ignores: ["dist/**"],
	react: true,
	tailwindcss: {
		overrides: {
			"tailwindcss/no-unnecessary-arbitrary-value": "off", // Turned off cuz using a custom root font-size (10px)
		},
	},
	tanstack: {
		react: true,
	},
	typescript: {
		tsconfigPath: "tsconfig.eslint.json",
	},
});
