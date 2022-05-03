
// Logging.
document.getElementById('mon-bouton').addEventListener('click', () => {
    window.logger.error("Une erreur critique est survenue");
});


document.getElementById('bouton-test').addEventListener('click', async () => {
   const response = await window.dialog.showMessageBox({
       buttons: ['Ok', 'Annuler'],
       cancelId: 1,
       title: "Faites un choix",
       message: 'Etes vous sûr de vouloir réaliser cette action ?',
       type: 'warning',
       checkboxLabel: "Veuillez confirmer en cochant la case",
       checkboxChecked: false,
   });

   await window.dialog.showMessageBox({
      title: 'Résultat:',
      message: `Bouton choisi: ${response.response}, la checkbox est elle cliquée ? ${response.checkboxChecked ? 'Oui' : 'Non'}`
   });
});
