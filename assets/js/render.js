document.getElementById('save').addEventListener('click', function() {
    window.file.save('test.txt', document.getElementById('text-content').value);
})