const {
	contextBridge,
	ipcRenderer
} = require('electron');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

contextBridge.exposeInMainWorld('alttpr', {

	getAppInfo ()
	{
		return ipcRenderer.invoke('get-app-info');
	},

	getAppConfig ()
	{
		return ipcRenderer.invoke('get-app-config');
	},

	randomizeRom (preset)
	{
		return ipcRenderer.invoke('randomize-rom', preset);
	},

	close (insight)
	{
		ipcRenderer.invoke('close', insight);
	}
});
