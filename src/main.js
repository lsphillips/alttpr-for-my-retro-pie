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

function isDebugging ()
{
	return process.env.DEBUG_ALTTPR_FOR_MY_PI === '1';
}

function setupWindow ()
{
	const window = new BrowserWindow({
		center            : true,
		resizable         : false,
		movable           : false,
		closable          : false,
		minimizable       : false,
		alwaysOnTop       : false,
		menuBarVisibility : false,
		titleBarStyle     : 'hidden',
		title             : 'ALTTPR For My Retro Pie',
		webPreferences    : {
			preload : getPathToFile('preload.cjs')
		}
	});

	window.focus();
	window.maximize();
	window.loadFile(
		getPathToFile('views/index.html')
	);

	// Debugging.
	if (
		isDebugging()
	)
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

	.then(() =>
	{
		setupIpcApi();
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
	app.quit(0);
});
