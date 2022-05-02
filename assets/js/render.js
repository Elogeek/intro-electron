const ipc = require('electron').ipcRenderer;

document.getElementById('mon-bouton').addEventListener('click', () => {
    ipc.send('log-error',
        {
            type: "Critical",
            message: "L'app va s'auto détruire !"
        });
});

ipc.on('log-error-reply', (event, arg) => {
    alert(arg);
});

// Box error : send d'un event pour afficher une fenêtre d'erreur
ipc.send('show-error-box', {
    title: "Erreur système",
    message: "Une erreur critique a été détectée, l'application doit redémarrer."
});