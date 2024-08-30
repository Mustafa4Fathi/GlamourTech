const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.json());
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'CSS')));
app.use(express.static(path.join(__dirname, 'JS')));
app.use(express.static(path.join(__dirname, 'data')));
app.use(express.static(path.join(__dirname, 'images')));

// Utility functions to read and write JSON files
const readJSONFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'data', filename), 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data));
        });
    });
};

const writeJSONFile = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, 'data', filename), JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

// CRUD Endpoints for Customers
app.get('/api/customers', async (req, res) => {
    try {
        const data = await readJSONFile('customers.json');
        res.json(data);
    } catch (error) {
        res.status(500).send({ error: 'Error reading customer data file' });
    }
});

app.post('/api/customers', async (req, res) => {
    try {
        const customers = await readJSONFile('customers.json');
        const newCustomer = req.body;
        customers.push(newCustomer);
        await writeJSONFile('customers.json', customers);
        res.status(201).send({ message: 'Customer added successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error updating customer data file' });
    }
});

// CRUD Endpoints for Admins
app.get('/api/admins', async (req, res) => {
    try {
        const data = await readJSONFile('admins.json');
        res.json(data);
    } catch (error) {
        res.status(500).send({ error: 'Error reading admin data file' });
    }
});

// CRUD Endpoints for Products
app.get('/api/products', async (req, res) => {
    try {
        const data = await readJSONFile('products.json');
        res.json(data);
    } catch (error) {
        res.status(500).send({ error: 'Error reading products data file' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const products = await readJSONFile('products.json');
        const newProduct = req.body;
        products.push(newProduct);
        await writeJSONFile('products.json', products);
        res.status(201).send({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error adding product' });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const products = await readJSONFile('products.json');
        const productId = parseInt(req.params.id);
        const updatedProduct = req.body;

        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products[index] = updatedProduct;
            await writeJSONFile('products.json', products);
            res.send({ message: 'Product updated successfully' });
        } else {
            res.status(404).send({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Error updating product' });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const products = await readJSONFile('products.json');
        const productId = parseInt(req.params.id);

        const newProducts = products.filter(product => product.id !== productId);
        await writeJSONFile('products.json', newProducts);
        res.send({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting product' });
    }
});

// CRUD Endpoints for Categories
app.get('/api/categories', async (req, res) => {
    try {
        const data = await readJSONFile('categories.json');
        res.json(data);
    } catch (error) {
        res.status(500).send({ error: 'Error reading categories data file' });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        const categories = await readJSONFile('categories.json');
        const newCategory = req.body;
        categories.push(newCategory);
        await writeJSONFile('categories.json', categories);
        res.status(201).send({ message: 'Category added successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error adding category' });
    }
});

// CRUD Endpoints for Orders
app.get('/api/orders', async (req, res) => {
    try {
        const data = await readJSONFile('orders.json');
        res.json(data);
    } catch (error) {
        res.status(500).send({ error: 'Error reading orders data file' });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const orders = await readJSONFile('orders.json');
        const newOrder = req.body;
        orders.push(newOrder);
        await writeJSONFile('orders.json', orders);
        res.status(201).send({ message: 'Order added successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error adding order' });
    }
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
