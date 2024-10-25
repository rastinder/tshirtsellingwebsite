const express = require('express');
const router = express.Router();

// Dummy data for orders
const orders = [];

// Create a new order
router.post('/', (req, res) => {
  const order = {
    id: orders.length + 1,
    items: req.body.items,
    total: req.body.total,
  };
  orders.push(order);
  res.json(order);
});

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;
