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

export function setupIpcApi ()
{
	let presets         = null;
	let settings        = null;
	let baseRom         = null;
	let targetDirectory = null;

	ipcMain.handle('get-app-info', () =>
	{
		return {
			version : app.getVersion()
		};
	});

	ipcMain.handle('get-app-config', async () =>
	{
		const [config, error] = await getConfig(
			join(app.getPath('userData'), 'config.json')
		);

		if (error)
		{
			return fail(error);
		}

		({ presets, settings, baseRom, targetDirectory } = config);

		return ok({
			presets, settings
		});
	});

	ipcMain.handle('randomize-rom', async (_, preset) =>
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

		const pathToRom = join(targetDirectory, `ALTTPR - ${preset.name} - ${hash}.sfc`);

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
		app.exit(error ? 1 : 0);
	});
}
