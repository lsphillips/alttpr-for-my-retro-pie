import {
	validatePresets
} from './schemas/presets.js';
import {
	ok,
	fail
} from '../utils/result.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export async function getPresets (url)
{
	const response = await fetch(url);

	if (response.status !== 200)
	{
		return fail(`Presets at '${url}' could not be loaded, received status code ${response.status}.`);
	}

	let presets;

	try
	{
		presets = await response.json();
	}
	catch
	{
		return fail(`Presets at '${url}' are not valid JSON.`);
	}

	if (
		!validatePresets(presets)
	)
	{
		return fail(`Presets at '${url}' are not valid.`);
	}

	return ok(presets);
}
