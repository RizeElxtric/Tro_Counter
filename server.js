const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 3000;

let counter = 0;

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
    counter++;
    // Persist the counter value to a file
    fs.writeFile('counter.txt', counter.toString())
        .catch(err => {
            console.error('Error writing counter value:', err);
        });

    res.json({ count: counter });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
