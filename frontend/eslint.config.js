import zayne from "@zayne-labs/eslint-config";

export default zayne({
	ignores: ["dist/**", "eslint.config.js"],
	react: true,
	tailwindcss: {
		overrides: {
			"tailwindcss/no-unnecessary-arbitrary-value": "off", // Turned off cuz using a custom root font-size (10px)
		},
	},
	typescript: {
		allowDefaultProjects: ["*.js"],
		tsconfigPath: "tsconfig.json",
	},
});
