const {
	contextBridge,
	ipcRenderer
} = require('electron');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

contextBridge.exposeInMainWorld('alttpr', {

	setup ()
	{
		return ipcRenderer.invoke('setup');
	},

	randomize (preset)
	{
		return ipcRenderer.invoke('randomize', preset);
	},

	close (insight)
	{
		ipcRenderer.invoke('close', insight);
	}
});
