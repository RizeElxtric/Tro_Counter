const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 3000;

let counter = 0;
let lastPressDate = null;

app.use(express.static('public'));
app.use(express.json());

// Read the counter value from a file on server startup
fs.readFile('counter.txt', 'utf8')
    .then(data => {
        counter = parseInt(data) || 0;
    })
    .catch(err => {
        console.error('Error reading counter value:', err);
    });

app.get('/api/counter', (req, res) => {
    res.json({ count: counter });
});

app.post('/api/increment', (req, res) => {
    if (!lastPressDate || !isSameDay(lastPressDate)) {
        counter++;
        lastPressDate = new Date().toISOString();

        // Persist the counter value to a file
        fs.writeFile('counter.txt', counter.toString())
            .catch(err => {
                console.error('Error writing counter value:', err);
            });

        res.json({ count: counter });
    } else {
        res.status(403).json({ error: 'You can only press the button once per day.' });
    }
});

function isSameDay(timestamp) {
    const today = new Date().toLocaleDateString();
    const lastPressDate = new Date(timestamp).toLocaleDateString();
    return today === lastPressDate;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
