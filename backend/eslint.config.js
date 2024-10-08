import zayne from "@zayne-labs/eslint-config";

export default zayne(
	{
		ignores: ["dist/**", "eslint.config.js"],
		typescript: {
			tsconfigPath: "tsconfig.json",
		},
	},
	[
		{
			rules: {
				"no-eval": ["error", { allowIndirect: true }],
			},
		},
		{
			rules: {
				"import/no-named-as-default-member": "off",
			},
		},
	]
);
