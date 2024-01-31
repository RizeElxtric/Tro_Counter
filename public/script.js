let count = 0;

function updateCounter() {
    fetch('/api/counter')
        .then(response => response.json())
        .then(data => {
            count = data.count;
            document.getElementById('counter').innerText = count;
        });
}

function incrementCounter() {
    fetch('/api/increment', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            count = data.count;
            document.getElementById('counter').innerText = count;
        })
        .catch(error => {
            alert(error.message);
        });
}

// Initialize the counter on page load
document.addEventListener('DOMContentLoaded', updateCounter);
