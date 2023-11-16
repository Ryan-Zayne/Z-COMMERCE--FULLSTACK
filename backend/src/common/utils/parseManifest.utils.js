import fs from 'node:fs/promises';
import path from 'node:path';
import { isDevMode } from './constants.js';

const parseManifest = async () => {
	if (isDevMode) return {};

	const manifestPath = path.resolve('../', 'frontend', 'dist', 'manifest.json');
	const manifestFile = await fs.readFile(manifestPath);

	return JSON.parse(manifestFile);
};

export { parseManifest };
