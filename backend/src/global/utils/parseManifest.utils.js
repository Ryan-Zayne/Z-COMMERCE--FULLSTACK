import fs from 'node:fs/promises';
import path from 'node:path';
import { environment } from './constants.js';

export const parseManifest = async () => {
	if (environment !== 'production') return {};

	const manifestPath = path.resolve('../', 'frontend', 'dist', 'manifest.json');
	const manifestFile = await fs.readFile(manifestPath);

	return JSON.parse(manifestFile);
};
