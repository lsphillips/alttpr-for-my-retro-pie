import {
	join
} from 'node:path';
import {
	globalShortcut,
	app,
	BrowserWindow
} from 'electron';
import {
	setupIpcApi
} from './ipc-api.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function getPathToFile (file)
{
	return join(import.meta.dirname, file);
}

function setupWindow ()
{
	const window = new BrowserWindow({
		width             : 1280,
		height            : 720,
		center            : true,
		resizable         : false,
		movable           : false,
		closable          : false,
		minimizable       : false,
		alwaysOnTop       : false,
		menuBarVisibility : false,
		titleBarStyle     : 'hidden',
		title             : 'The Legend of Zelda - A Link to the Past Randomizer',
		webPreferences    : {
			preload : getPathToFile('preload.cjs')
		}
	});

	window.focus();
	window.loadFile(
		getPathToFile('views/index.html')
	);

	// Debugging.
	if (process.env.DEBUG_ALTTPR_FOR_MY_PI === '1')
	{
		globalShortcut.register('f5', () =>
		{
			window.reload();
		});

		window.webContents.openDevTools({
			mode : 'detach'
		});
	}

	return window;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.whenReady()

	.then(async () =>
	{
		setupIpcApi({
			pathToConfig : app.commandLine.getSwitchValue('config')
		});

		setupWindow();
	})

	.catch(error =>
	{
		console.error(error);
	});

app.on('will-quit', () =>
{
	globalShortcut.unregisterAll();
});

app.on('window-all-closed', () =>
{
	app.quit(2);
});
