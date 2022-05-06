const textarea = document.getElementById('text-content');

document.getElementById('save').addEventListener('click', function() {
    window.file.save(textarea.value);
})

document.getElementById('load').addEventListener('click', function() {
    window.file.read()
        .then(data => textarea.value = data);
})

const func = () => {
    console.log("hello");
};

window.menu.onOpenDialogClick(func);

