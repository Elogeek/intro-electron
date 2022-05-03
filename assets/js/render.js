document.getElementById('mon-bouton').addEventListener('click', () => {
    window.logger.error('Critical', "Error critical est survenue", () => {
        console.log("Message reçu en provenant du main process");
    });
});

