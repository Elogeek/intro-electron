const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

// Create the Browser Window and load the main html entry point.
let mainWindow = null;
const makeWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        center: true,
        title: "CTrack",
        icon: path.resolve(__dirname + "/assets/icon.png"),
        autoHideMenuBar: true,
        webPreferences: {
            preload: `${__dirname}/preload.js`
        }
    })

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('src/index.html');
};

// Create app when electron is ready.
app.whenReady().then(() => {
    makeWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            makeWindow()
        }
    })
});

// Closing app if all windows are closed BUT MacOs.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

// Logger events.
ipcMain.on('log', (event, arg) => {
    if('type' in arg && 'message' in arg) {
        console.table(arg);
        console.log(`Type: ${arg.type} => message: ${arg.message}`);
    }
    else {
        console.error('Une erreur inconnue a été reportée par un des Render process');
    }
});


ipcMain.handle('showMessageBox', (event, arg) => dialog.showMessageBox(mainWindow, arg));
