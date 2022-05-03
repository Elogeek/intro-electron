const {contextBridge, ipcRenderer} = require("electron");

// Message error
const logError = (message, level, onMainProcessEvent = () => {}) => {
    ipcRenderer.send('log', {
        type: level,
        message: message
    });
    ipcRenderer.once('main-process-event', onMainProcessEvent)
};

// Message success
const logSuccess = (message, level, onMainProcessEvent = () => {}) => {
    ipcRenderer.send('log', {
        type: 'success',
        message: message
    });
    ipcRenderer.on('main-process-event', onMainProcessEvent);
    // delete event
    ipcRenderer.removeAllListeners('main-process-event');
};

contextBridge.exposeInMainWorld('logger', {
    'error': logError,
    'success': logSuccess
});

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);