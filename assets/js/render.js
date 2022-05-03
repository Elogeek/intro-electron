window.logger.onMainProcessEvent = () => {
    console.log("Message reçu !");
}

// Logging
document.getElementById('mon-bouton').addEventListener('click', () => {
    window.logger.error('Critical', "Error critical est survenue", () => {
        //console.log("Message reçu en provenant du main process");
    });
});

/* Appel ajax
document.getElementById('bouton-ajax').addEventListener('click', async () => {
    const result = await window.ipcRenderer.invoke('ajax-request', 'https://jsonplaceholder.typicode.com/todos/1');
    document.getElementById('ajax-content').innerText = JSON.stringify(result)
})
*/

// Test
document.getElementById('bouton-test').addEventListener('click', async  () => {
    const response = await window.dialog.showMessageBox({
        buttons: ['Ok', 'Annuler'],
        cancelId: 1,
        title: 'Ma box dialog',
        message: "Etes vous sûr de vouloir réaliser cette action ?",
        type: 'warning',
        checkboxLabel: "Confirmer votre choix, en cochant la case .",
        checkboxChecked: false
    });
    console.log(response);
});