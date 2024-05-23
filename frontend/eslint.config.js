import { fixupPluginRules } from "@eslint/compat";
import eslintBase from "@eslint/js";
import eslintImportX from "eslint-plugin-import-x";
import eslintJsxA11y from "eslint-plugin-jsx-a11y";
import eslintReact from "eslint-plugin-react";
import eslintReactHooks from "eslint-plugin-react-hooks";
import eslintTailwind from "eslint-plugin-tailwindcss";
import eslintUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('typescript-eslint').ConfigWithExtends[]} */

const eslintConfigArray = [
	// Global Options
	{
		ignores: ["dist/**", "node_modules/**", "build/**"],
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},

	// Base Eslint Rules
	eslintBase.configs.recommended,
	{
		rules: {
			"no-return-assign": ["error", "except-parens"],
			"prefer-arrow-callback": [
				"error",
				{
					allowNamedFunctions: true,
				},
			],
			"no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
			"no-console": ["error", { allow: ["warn", "error", "info"] }],
			"constructor-super": "error",
			"no-class-assign": "error",
			//FIXME - JsOnly -  disallow modifying variables that are declared using const
			"no-const-assign": "error",
			"no-dupe-class-members": "error",
			"no-restricted-exports": [
				"error",
				{
					restrictedNamedExports: [
						"default", // use `export default` to provide a default export
						"then", // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
					],
				},
			],
			"no-this-before-super": "error",
			"no-useless-computed-key": "error",
			"no-useless-constructor": "error",
			"no-useless-rename": [
				"error",
				{ ignoreDestructuring: false, ignoreImport: false, ignoreExport: false },
			],
			"no-var": "error",
			"no-unsafe-optional-chaining": ["error", { disallowArithmeticOperators: true }],
			"no-unsafe-negation": "error",
			"no-unsafe-finally": "error",
			"no-unreachable-loop": [
				"error",
				{
					ignore: [], // WhileStatement, DoWhileStatement, ForStatement, ForInStatement, ForOfStatement
				},
			],
			// disallow irregular whitespace outside of strings and comments
			"no-irregular-whitespace": "error",
			"no-invalid-regexp": "error",
			"getter-return": ["error", { allowImplicit: true }],
			"no-constant-condition": "warn",
			"no-empty": "error",
			"no-func-assign": "error",
			"valid-jsdoc": "error",
			"no-await-in-loop": "error",
			"no-cond-assign": ["error", "always"],
			"no-duplicate-case": "error",
			"no-unreachable": "error",
			"no-unexpected-multiline": "error",
			"no-template-curly-in-string": "error",
			"no-sparse-arrays": "error",
			"object-shorthand": ["error", "always", { ignoreConstructors: false, avoidQuotes: true }],
			"prefer-const": ["error", { destructuring: "any", ignoreReadBeforeAssign: true }],
			"prefer-destructuring": [
				"error",
				{
					VariableDeclarator: {
						array: false,
						object: true,
					},
					AssignmentExpression: {
						array: true,
						object: false,
					},
				},
				{
					enforceForRenamedProperties: false,
				},
			],
			"prefer-reflect": "warn",
			"prefer-rest-params": "error",
			"prefer-spread": "error",
			"prefer-template": "error",
			"rest-spread-spacing": ["error", "never"],
			"symbol-description": "error",
			"no-restricted-imports": ["off", { paths: [], patterns: [] }],
			"no-restricted-globals": [
				"error",
				{
					name: "isFinite",
					message:
						"Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite",
				},
				{
					name: "isNaN",
					message:
						"Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan",
				},
			],
			"no-shadow-restricted-names": "error",
			"no-undef": "error",
			"no-undef-init": "error",
			"array-callback-return": ["error", { allowImplicit: true }],
			"class-methods-use-this": [
				"error",
				{
					exceptMethods: [],
				},
			],
			complexity: ["error", 25],
			// specify curly brace conventions for all control statements
			// https://eslint.org/docs/rules/curly
			curly: ["error", "multi-line"], // multiline
			"default-case": ["error", { commentPattern: "^no default$" }],
			"default-case-last": "error",
			// enforces consistent newlines before or after dots
			// https://eslint.org/docs/rules/dot-location
			"dot-location": ["error", "property"],
			eqeqeq: ["error", "always", { null: "ignore" }],
			"grouped-accessor-pairs": "error",
			"no-alert": "warn",
			"no-case-declarations": "error",
			"no-constructor-return": "error",
			"no-else-return": ["error", { allowElseIf: false }],
			"no-empty-function": ["error", { allow: ["arrowFunctions", "functions", "methods"] }],
			"no-empty-pattern": "error",
			"no-extend-native": "error",
			"no-extra-bind": "error",
			"no-fallthrough": "error",
			"no-floating-decimal": "error",
			"no-global-assign": ["error", { exceptions: [] }],
			"no-lone-blocks": "error",
			"no-loop-func": "error",
			"no-new": "error",
			"no-new-func": "error",
			"no-new-wrappers": "error",
			"no-param-reassign": [
				"error",
				{
					props: true,
					ignorePropertyModificationsFor: [
						"acc", // for reduce accumulators
						"accumulator", // for reduce accumulators
						"e", // for e.returnvalue
						"ctx", // for Koa routing
						"context", // for Koa routing
						"req", // for Express requests
						"request", // for Express requests
						"res", // for Express responses
						"response", // for Express responses
						"$scope", // for Angular 1 scopes
						"staticContext", // for ReactRouter context
					],
				},
			],
			"no-restricted-properties": [
				"error",
				{
					object: "arguments",
					property: "callee",
					message: "arguments.callee is deprecated",
				},
				{
					object: "global",
					property: "isFinite",
					message: "Please use Number.isFinite instead",
				},
				{
					object: "self",
					property: "isFinite",
					message: "Please use Number.isFinite instead",
				},
				{
					object: "window",
					property: "isFinite",
					message: "Please use Number.isFinite instead",
				},
				{
					object: "global",
					property: "isNaN",
					message: "Please use Number.isNaN instead",
				},
				{
					object: "self",
					property: "isNaN",
					message: "Please use Number.isNaN instead",
				},
				{
					object: "window",
					property: "isNaN",
					message: "Please use Number.isNaN instead",
				},
				{
					object: "Math",
					property: "pow",
					message: "Use the exponentiation operator (**) instead.",
				},
			],
			"no-script-url": "error",
			"no-self-assign": ["error", { props: true }],
			"no-self-compare": "error",
			"no-sequences": "error",
			"no-useless-catch": "error",
			"no-useless-concat": "error",
			"no-useless-escape": "error",
			"no-useless-return": "error",
			"prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],
			"prefer-object-has-own": "error",
			"prefer-regex-literals": ["error", { disallowRedundantWrapping: true }],
			radix: "error",
			"vars-on-top": "error",
			"wrap-iife": ["error", "outside", { functionPrototypeMethods: false }],
		},
	},

	// Typescript Eslint Rules
	...tseslint.configs.strictTypeChecked.map((item) => ({ ...item, ignores: ["**/*.js"] })),
	...tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				project: "config/tsconfig.eslint.json",
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/no-unused-expressions": [
				"error",
				{
					allowShortCircuit: true,
					allowTernary: true,
				},
			],
			"@typescript-eslint/no-import-type-side-effects": "error",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/array-type": ["error", { default: "array-simple" }],
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/no-useless-constructor": "error",
			"@typescript-eslint/member-ordering": "error",
			"@typescript-eslint/no-confusing-void-expression": "off",
			"@typescript-eslint/non-nullable-type-assertion-style": "off",
			"@typescript-eslint/no-use-before-define": "off",
			"@typescript-eslint/method-signature-style": ["error", "property"],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowNumber: true, allowNullish: true, allowBoolean: true },
			],
			"@typescript-eslint/default-param-last": "error",
			"@typescript-eslint/return-await": ["error", "in-try-catch"],
			"@typescript-eslint/require-await": "error",
			"@typescript-eslint/no-empty-function": [
				"error",
				{ allow: ["arrowFunctions", "functions", "methods"] },
			],
			"@typescript-eslint/lines-between-class-members": "warn",
			"@typescript-eslint/dot-notation": "error",
			"@typescript-eslint/no-throw-literal": "error",
			"@typescript-eslint/no-shadow": "error",
			"@typescript-eslint/no-redeclare": "error",
		},
	},

	// Import rules
	eslintImportX.configs.typescript,
	{
		plugins: { "import-x": eslintImportX },
		rules: {
			...eslintImportX.configs.recommended.rules,
			"import-x/extensions": ["error", "never", { ignorePackages: false }],
			"import-x/no-extraneous-dependencies": ["error", { devDependencies: true }],
			"import-x/prefer-default-export": "off",
			"import-x/no-cycle": ["error", { ignoreExternal: true, maxDepth: 3 }],
			"import-x/no-unresolved": "off",
			"import-x/export": "error",
			"import-x/no-named-as-default": "error",
			"import-x/namespace": "off",
			"import-x/no-named-as-default-member": "error",
			"import-x/no-mutable-exports": "error",
			"import-x/first": "error",
			"import-x/no-duplicates": "error",
			"import-x/newline-after-import": "error",
			"import-x/no-absolute-path": "error",
			"import-x/no-named-default": "error",
			"import-x/no-self-import": "error",
			"import-x/no-useless-path-segments": ["error", { commonjs: true }],
			"import-x/no-relative-packages": "error",
		},
	},

	// Unicorn rules
	eslintUnicorn.configs["flat/recommended"],
	{
		rules: {
			"unicorn/no-null": "off",
			"unicorn/filename-case": [
				"warn",
				{
					cases: {
						camelCase: true,
						pascalCase: true,
						kebabCase: true,
					},
				},
			],
			"unicorn/no-negated-condition": "off",
			"unicorn/prevent-abbreviations": "off",
			"unicorn/new-for-builtins": "off",
			"unicorn/numeric-separators-style": "off",
			"unicorn/no-array-reduce": "off",
			"unicorn/no-array-for-each": "off",
			"unicorn/no-useless-undefined": ["error", { checkArguments: true }],
		},
	},

	// React Rules
	{
		languageOptions: {
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},

		settings: {
			react: {
				version: "detect",
			},
		},

		plugins: {
			react: fixupPluginRules(eslintReact),
			"react-hooks": fixupPluginRules(eslintReactHooks),
		},

		rules: {
			...eslintReact.configs.recommended.rules,
			...eslintReact.configs["jsx-runtime"].rules,
			...eslintReactHooks.configs.recommended.rules,
			"react-hooks/rules-of-hooks": "error",
			"react/self-closing-comp": ["error", { component: true }],
			"react/jsx-curly-brace-presence": [
				"error",
				{
					props: "ignore",
					children: "ignore",
					propElementValues: "always",
				},
			],
			"react/jsx-no-useless-fragment": [
				"error",
				{
					allowExpressions: true,
				},
			],
			"react/jsx-boolean-value": ["error", "always"],
			"react/button-has-type": "off",
			"react/function-component-definition": "off",
			"react-hooks/exhaustive-deps": "warn",
			"react/jsx-filename-extension": [
				"error",
				{
					extensions: [".tsx", ".jsx"],
				},
			],
			"react/jsx-props-no-spreading": "off",
			"react/require-default-props": "off",
			"react/hook-use-state": "off",
			"react/no-invalid-html-attribute": "error",
			"react/jsx-fragments": ["error", "syntax"],
			"react/destructuring-assignment": ["error", "always"],
			"react/no-typos": "error",
			"react/no-array-index-key": "error",
			"react/no-children-prop": "error",
			"react/no-danger-with-children": "error",
			"react/jsx-no-target-blank": ["error", { enforceDynamicLinks: "always" }],
			"react/jsx-no-duplicate-props": ["error", { ignoreCase: true }],
		},
	},

	// JSX A11y Rules
	{
		plugins: {
			"jsx-a11y": fixupPluginRules(eslintJsxA11y),
		},
		rules: {
			"jsx-a11y/click-events-have-key-events": "off",
			"jsx-a11y/no-static-element-interactions": "off",
			"jsx-a11y/control-has-associated-label": "off",
			"jsx-a11y/label-has-associated-control": [
				"error",
				{
					labelComponents: ["CustomInputLabel"],
					labelAttributes: ["label"],
					controlComponents: ["CustomInput"],
					depth: 3,
				},
			],
			"jsx-a11y/alt-text": [
				"error",
				{
					elements: ["img", "object", "area", "input[type='image']"],
					img: [],
					object: [],
					area: [],
					"input[type='image']": [],
				},
			],
			"jsx-a11y/anchor-has-content": ["error", { components: [] }],
			"jsx-a11y/anchor-is-valid": [
				"error",
				{
					components: ["Link"],
					specialLink: ["to"],
					aspects: ["noHref", "invalidHref", "preferButton"],
				},
			],
			"jsx-a11y/aria-activedescendant-has-tabindex": "error",
			"jsx-a11y/aria-props": "error",
			"jsx-a11y/aria-proptypes": "error",
			"jsx-a11y/aria-role": ["error", { ignoreNonDOM: false }],
			"jsx-a11y/aria-unsupported-elements": "error",
			"jsx-a11y/autocomplete-valid": ["warn", { inputComponents: [] }],
			"jsx-a11y/heading-has-content": ["error", { components: [""] }],
			"jsx-a11y/html-has-lang": "error",
			"jsx-a11y/iframe-has-title": "error",
			"jsx-a11y/img-redundant-alt": "error",
			"jsx-a11y/interactive-supports-focus": "error",
			"jsx-a11y/lang": "error",
			"jsx-a11y/media-has-caption": [
				"error",
				{
					audio: [],
					video: [],
					track: [],
				},
			],
			"jsx-a11y/mouse-events-have-key-events": "error",
			"jsx-a11y/no-access-key": "error",
			"jsx-a11y/no-autofocus": ["error", { ignoreNonDOM: true }],
			"jsx-a11y/no-distracting-elements": ["error", { elements: ["marquee", "blink"] }],
			"jsx-a11y/no-interactive-element-to-noninteractive-role": [
				"error",
				{ tr: ["none", "presentation"] },
			],
			"jsx-a11y/no-noninteractive-element-interactions": [
				"error",
				{ handlers: ["onClick", "onMouseDown", "onMouseUp", "onKeyPress", "onKeyDown", "onKeyUp"] },
			],
			"jsx-a11y/no-noninteractive-element-to-interactive-role": [
				"error",
				{
					ul: ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
					ol: ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
					li: ["menuitem", "option", "row", "tab", "treeitem"],
					table: ["grid"],
					td: ["gridcell"],
				},
			],
			"jsx-a11y/no-noninteractive-tabindex": [
				"error",
				{
					tags: [],
					roles: ["tabpanel"],
					allowExpressionValues: true,
				},
			],
			"jsx-a11y/no-redundant-roles": [
				"error",
				{
					nav: ["navigation"],
				},
			],
			"jsx-a11y/role-has-required-aria-props": "error",
			"jsx-a11y/role-supports-aria-props": "error",
			"jsx-a11y/scope": "error",
			"jsx-a11y/tabindex-no-positive": "error",
			"jsx-a11y/anchor-ambiguous-text": "error",
			"jsx-a11y/no-aria-hidden-on-focusable": "error",
			"jsx-a11y/prefer-tag-over-role": "error",
		},
	},

	// Tailwind Rules
	...eslintTailwind.configs["flat/recommended"],
	{
		rules: {
			"tailwindcss/no-custom-classname": "off",
			"tailwindcss/no-contradicting-classname": "off",
			"tailwindcss/no-unnecessary-arbitrary-value": "off",
			"tailwindcss/classnames-order": [
				"warn",
				{
					config: "./tailwind.config.ts",
				},
			],
		},
	},
];

export default eslintConfigArray;
