const {app, BrowserWindow, ipcMain} = require("electron");
const remote = require('@electron/remote/main');

// Create the Browser Window and load the main html entry point.
const makeWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 500,
        center: true,
        title: 'Intro Electron',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    // Second window (child window)
    const secondWindow = new BrowserWindow({
        movable: true,
        parent: win,
        x: win.getBounds().x + 100,
        y: win.getBounds().y + 50,
    });

    remote.initialize();
    remote.enable(win.webContents);
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

ipcMain.on('log-error', (event, arg) => {
    if('type' in arg && 'message' in arg) {
        console.table(arg);
        console.log('Erreur -> Type: ${arg.type} => message: ${arg.message}');
        //Send a answer à l'émetteur de l'event 'log-error'
        event.sender.send('log-error-reply', "Error was logged");
    }
    else {
        console.log("Une erreur inconnue est apparue par un Render process")
    }
})


