import { zayne } from "@zayne-labs/eslint-config";

export default zayne(
	{
		ignores: ["frontend/dist"],
		react: true,
		tailwindcss: {
			overrides: {
				"tailwindcss/no-unnecessary-arbitrary-value": "off", // Turned off cuz using a custom root font-size (10px)
			},
			settings: {
				config: "frontend/tailwind.config.ts",
			},
		},
		tanstack: {
			query: true,
		},
		typescript: {
			tsconfigPath: ["./**/tsconfig.json"],
		},
	},
	{
		files: ["backend/src/**/*.ts"],
		rules: {
			"import/default": "off",
			"import/no-named-as-default-member": "off",
			"node/no-process-env": "error",
		},
	}
);
