document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var nameInput = document.getElementById('name').value;

    if (!nameInput.trim()) {
        alert('Nama tidak boleh kosong!');
    } else {
        localStorage.setItem('userName', nameInput); 
        window.location.href = 'level-1.html';
    }
});