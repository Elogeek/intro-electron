const {app, BrowserWindow} = require("electron");

// Create the Browser Window and load the main html entry point.
const makeWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 500,
        center: true,
        title: 'Intro Electron'
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

app.whenReady().then(makeWindow);