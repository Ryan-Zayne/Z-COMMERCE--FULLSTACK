/* eslint-disable ts-eslint/consistent-type-definitions */
/// <reference types="vite/client" />

type ImportMetaEnv = {
	readonly NODE_ENV: "development" | "production";
};

type ImportMeta = {
	readonly env: ImportMetaEnv;
};
