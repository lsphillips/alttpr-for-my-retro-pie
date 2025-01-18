import {
	join
} from 'node:path';
import {
	writeFile
} from 'node:fs/promises';
import {
	app,
	ipcMain
} from 'electron';
import {
	ok,
	fail
} from './utils/result.js';
import {
	getConfig
} from './config/config-loader.js';
import randomize from './alttpr/randomizer.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function setupIpcApi ({
	pathToConfig
})
{
	let presets             = null;
	let settings            = null;
	let baseRom             = null;
	let targetDirectoryPath = null;

	ipcMain.handle('setup', async () =>
	{
		const [config, error] = await getConfig(pathToConfig);

		if (error)
		{
			return fail(error);
		}

		({ presets, settings, baseRom, targetDirectoryPath } = config);

		return ok({
			presets, settings
		});
	});

	ipcMain.handle('randomize', async (_, preset) =>
	{
		const [result, error] = await randomize(baseRom, {
			...settings, ...preset
		});

		if (error)
		{
			return fail(error);
		}

		const {
			hash,
			build,
			permalink,
			game
		} = result;

		const pathToRom = join(targetDirectoryPath, 'alttpr.sfc');

		try
		{
			await writeFile(pathToRom, game, null);
		}
		catch
		{
			return fail(`Could not save randomized ROM to ${pathToRom}.`);
		}

		return ok({
			hash, build, permalink
		});
	});

	ipcMain.handle('close', (_, {
		error = false
	} = {}) =>
	{
		// This may seem backwards but this is what custom
		// scripts in RetroPie expect.
		//
		// Documentation: https://retropie.org.uk/docs/Runcommand/#runcommand-menu-custom-scripts
		app.exit(error ? 0 : 2);
	});
}
