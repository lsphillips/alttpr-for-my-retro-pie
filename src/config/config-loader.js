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

	const [baseRom, baseRomError] = await getBaseRom(baseRomPath);

	if (baseRomError)
	{
		return fail(baseRomError);
	}

	const [presets, presetError] = typeof seedPresets === 'string' ? await getPresets(seedPresets) : [seedPresets];

	if (presetError)
	{
		return fail(presetError);
	}

	try
	{
		await access(targetDirectoryPath);
	}
	catch
	{
		return fail('The target directory does not exist.');
	}

	return ok({
		baseRom,
		targetDirectoryPath,
		presets : presets.map(parsePreset),
		settings : parseSettings(settings)
	});
}
