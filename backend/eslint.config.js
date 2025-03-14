import { zayne } from "@zayne-labs/eslint-config";

export default zayne({
	ignores: ["dist/**", "eslint.config.js"],
	javascript: {
		overrides: {
			"no-eval": ["error", { allowIndirect: true }],
		},
	},
	imports: {
		overrides: {
			"import/no-named-as-default-member": "off",
		},
	},
	node: {
		overrides: {},
	},
	typescript: {
		tsconfigPath: "tsconfig.json",
	},
});
