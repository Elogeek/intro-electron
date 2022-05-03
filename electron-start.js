const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const fetch = require('node-fetch');

// Create the Browser Window and load the main html entry point.
const makeWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 500,
        center: true,
        title: 'Intro Electron',
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(__dirname + "/preload.js")
        }
    })

    // Second window (child window)
    const secondWindow = new BrowserWindow({
        movable: true,
        parent: win,
        x: win.getBounds().x + 100,
        y: win.getBounds().y + 50,
    });

    win.loadFile("src/hello-world.html");
    secondWindow.loadURL('https://www.google.fr');
    // Open console
    win.webContents.openDevTools();
}

// Create app when electron is ready.
app.whenReady().then(() => {
    makeWindow();
    // On MacOs, if app window does not exist, then create on "activate" event.
    app.on("activate", () => {
        makeWindow();
        if (BrowserWindow.getAllWindows().length === 0) {
            makeWindow();
        }
    });
});

// Closing app if all windows are closed.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

/**
 * Simple ajax call from Main process
 */
ipcMain.handle('ajax-request', async (event, url) => {
    const response = await fetch(url);
    return response.json();
})

ipcMain.on('log', (event, arg) => {
    if('type' in arg && 'message' in arg) {
        console.table(arg);
        console.log('Erreur -> Type: ${arg.type} => message: ${arg.message}');
        //Send a answer à l'émetteur de l'event 'log'
        event.sender.send('main-process-event', "Message logged");
    }
    else {
        console.log("Une erreur inconnue est apparue par un Render process")
    }
});


