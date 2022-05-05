const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('file', {
    save: (filename, content) => ipcRenderer.invoke('save-file', filename, content)
})