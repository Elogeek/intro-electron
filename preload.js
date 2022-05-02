const {contextBridge, ipcRender} = require("electron");

// Message error
logError = (message, level) => {
    ipcRender.send('log', {
        type: level,
        message: message
    });
};

// Message success
logSuccess = (message, level) => {
    ipcRender.send('log', {
        type: level,
        message: message
    });
};

contextBridge.exposeInMainWorld('logger', {
    'error': logError,
    'success': logSuccess
});