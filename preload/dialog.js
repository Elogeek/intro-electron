const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('dialog', {
    showMessageBox: async config => ipcRenderer.invoke('showMessageBox',config)
});