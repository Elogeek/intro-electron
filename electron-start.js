const { app, BrowserWindow, ipcMain, Menu, Tray, Notification} = require('electron');
const path = require('path');

const ipcDialog = require('./main/dialog');
const ipcFile = require('./main/files');
const ipcLogger = require('./main/logger');
const ApplicationMenu = require('./main/application_menu');
let trayQuitting = false;

// Create the Browser Window and load the main html entry point.
let mainWindow = null;
const makeWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        center: true,
        title: "CTrack",
        icon: path.resolve(__dirname + "/assets/icon.png"),
        webPreferences: {
            preload: `${__dirname}/preload.js`
        },
        show: false,
    })

    //mainWindow.webContents.openDevTools();
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

    // Tray icon
    mainWindow.on('close', event => {
        if(!trayQuitting) {
            event.preventDefault();
            BrowserWindow.getAllWindows().map(window => window.hide());
        }
    });

    const tray = new Tray('./assets/images/icon.png');
    const contextual = [
        {
            label: "Quitter",
            click: () => {
                trayQuitting = true;
                app.quit();
            },
        },
        {
            label: "Ouvrir",
            click: () => mainWindow.show(),
        },
        {type: 'separator'}, // Pas beau sous linux.
        {role: 'copy'}       // Ne sert a rien dans le tray, juste pour démonstration.
    ];
    tray.setContextMenu(Menu.buildFromTemplate(contextual));
    const notification = new Notification({
        title: "L'application est prête",
        body: "L'application a été lançée et est prête pour l'utilisation !",
        icon: "./assets/images/icon.png",
    });

    notification.show();
    notification.on('click', () => mainWindow.show());
});

// Closing app if all windows are closed BUT MacOs.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});


ipcDialog.init(mainWindow, ipcMain);
ipcFile.init(mainWindow, ipcMain);
ipcLogger.init(ipcMain);

// Application menu.
const menu = new ApplicationMenu(mainWindow);
Menu.setApplicationMenu(menu.getMenu());

// contextual menu.
const contextualMenuTemplate = [
    {
        label: "Menu contextuel 1",
        click: () => console.log("Menu contextuel 1 clicked"),
    }
];

const contextualMenu = Menu.buildFromTemplate(contextualMenuTemplate);


// Affichage du menu contextuel
ipcMain.on('show-context-menu', (event) => contextualMenu.popup(mainWindow));

// Affichage d'une notification
ipcMain.on('show-notification', (event, configuration, onClick) => {
    const notification = new Notification({...configuration});
    notification.show();
    notification.on('click', () => event.sender.send('show-notification-clicked'));
});
