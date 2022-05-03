const {contextBridge, ipcRenderer} = require("electron");

// Message error
const logError = (message, level) => {
    ipcRenderer.send('log', {
        type: 'error',
        message: message
    });

};

// Message success
const logSuccess = (message) => {
    ipcRenderer.send('log', {
        type: 'success',
        message: message
    });
};

contextBridge.exposeInMainWorld('logger', {
    'error': logError,
    'success': logSuccess
});
