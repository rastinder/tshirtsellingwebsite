const express = require('express');
const router = express.Router();

// Dummy data for products
const products = [
  { id: 1, name: 'AI-Generated T-Shirt 1', price: 20 },
  { id: 2, name: 'AI-Generated T-Shirt 2', price: 25 },
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get a single product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found.');
  res.json(product);
});

module.exports = router;
