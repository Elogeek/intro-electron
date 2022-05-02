const ipc = require('electron').ipcRenderer;

document.getElementById('mon-bouton').addEventListener('click', () => {
    ipc.send('log-error', "Erreur interne, impossible de trouver vos paramètres");
})