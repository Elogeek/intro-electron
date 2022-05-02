const ipc = require('electron').ipcRenderer;
const remote = require('@electron/remote');

document.getElementById('mon-bouton').addEventListener('click', () => {
    ipc.send('log-error',
        {
            type: "Critical",
            message: "L'app va s'auto détruire !"
        });

    // Box error : send d'un event pour afficher une fenêtre d'erreur
    remote.dialog.showErrorBox('Error system',"Une erreur critique a été détectée, l'application doit redémarrer." )
});

ipc.on('log-error-reply', (event, arg) => {
    alert(arg);
});


