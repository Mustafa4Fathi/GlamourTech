const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());


const readJSONFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'data', filename), 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data));
        });
    });
};

// Endpoint للقراءة بيانات المستخدمين
app.get('/api/customers', async (req, res) => {
    try {
        const data = await readJSONFile('customers.json');
        res.json(data);
    } 
    catch (error) {
    res.status(500).send('Error reading file');
    }
});

app.get('/api/admins', async (req, res) => {
    try {
        const data = await readJSONFile('admins.json');
        res.json(data);
    }
    catch (error) {
        res.status(500).send('Error reading file');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
