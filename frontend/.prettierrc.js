/** @type {import("prettier").Config} */

const prettierConfig = {
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindFunctions: ['cnMerge', 'cnJoin'],
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	insertPragma: false,
	jsxSingleQuote: false,
	printWidth: 107,
	proseWrap: 'preserve',
	quoteProps: 'as-needed',
	semi: true,
	singleQuote: true,
	tabWidth: 3,
	trailingComma: 'es5',
	useTabs: true,
};

export default prettierConfig;
