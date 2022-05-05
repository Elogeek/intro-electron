const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require("fs");

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

// Writing file
ipcMain.handle('save-file', async (event, content) => {
    // Affichage d'une boite de dialog
    dialog.showSaveDialog(mainWindow, {
        // Options de la boite dialog
        title: "Choisissez une destination",
        defaultPath: path.resolve(__dirname, 'mon-fichier.txt'),
        buttonLabel: "valider mon choix"
    })
        // Une * un fichier et le chemin choisi, on traite l'enregistrement
        .then(result => {
            // Uniquement si l'useer n'a pas appuyer sur le btn annuler
            if(!result.canceled) {
                try {
                    // Enregistrement
                    fs.writeFileSync(result.filePath, content);
                }
                catch(err) {
                    // If enregistrement échoue, alors message error s'affiche
                    dialog.showErrorBox("Erreur", "une erreur est survenue");
                }
            }
        })
        // Prise en charge d'autres erruerrs potentiels
        .catch(err => () => dialog.showErrorBox("Erreur", "une erreur est survenue"))

});