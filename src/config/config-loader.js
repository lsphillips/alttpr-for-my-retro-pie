import {
	resolve,
	dirname
} from 'node:path';
import {
	readFile,
	access
} from 'node:fs/promises';
import {
	getPresets
} from './preset-loader.js';
import {
	getBaseRom
} from './base-rom-loader.js';
import {
	parsePreset,
	parseSettings
} from './alttpr-config-parser.js';
import {
	validateConfig
} from './schemas/config.js';
import {
	ok,
	fail
} from '../utils/result.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function resolvePathRelativeToConfig (path, config)
{
	return resolve(
		dirname(config), path
	);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export async function getConfig (path)
{
	let file;

	try
	{
		file = await readFile(path);
	}
	catch
	{
		return fail(`Configuration file '${path}' does not exist.`);
	}

	let config;

	try
	{
		config = JSON.parse(file);
	}
	catch
	{
		return fail(`Configuration file '${path}' is not valid JSON.`);
	}

	if (
		!validateConfig(config)
	)
	{
		return fail(`Configuration file '${path}' is not valid.`);
	}

	const {
		baseRomPath,
		targetDirectoryPath,
		seedPresets,
		...settings
	} = config;

	const [baseRom, baseRomError] = await getBaseRom(
		resolvePathRelativeToConfig(baseRomPath, path)
	);

	if (baseRomError)
	{
		return fail(baseRomError);
	}

	const [presets, presetError] = typeof seedPresets === 'string' ? await getPresets(seedPresets) : [seedPresets];

	if (presetError)
	{
		return fail(presetError);
	}

	const targetDirectory = resolvePathRelativeToConfig(targetDirectoryPath, path);

	try
	{
		await access(targetDirectory);
	}
	catch
	{
		return fail(`The target directory '${targetDirectory}' does not exist.`);
	}

	return ok({
		baseRom,
		targetDirectory,
		presets : presets.map(parsePreset),
		settings : parseSettings(settings)
	});
}
