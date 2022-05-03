document.getElementById('mon-bouton').addEventListener('click', () => {
    window.logger.error('Critical', "Error critical est survenue", () => {
        console.log("Message reçu en provenant du main process");
    });
});

// Appel ajax
document.getElementById('bouton-ajax').addEventListener('click', async () => {
    const result = await window.ipcRenderer.invoke('ajax-request', 'https://jsonplaceholder.typicode.com/todos/1');
    document.getElementById('ajax-content').innerText = JSON.stringify(result)
})

