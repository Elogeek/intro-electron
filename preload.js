const {ipcRenderer, contextBridge} = require('electron');
let onOpenDialogMenuItemClick = null;

require ('./preload/logger');
require ('./preload/dialog');
require ('./preload/files');

contextBridge.exposeInMainWorld('menu', {
    'onOpenDialogClick': (fn) => ipcRenderer.on('open-dialog-clicked', fn),
});
