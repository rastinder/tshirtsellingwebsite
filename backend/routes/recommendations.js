const express = require('express');
const router = express.Router();

// Dummy data for products
const products = [
  { id: 1, name: 'AI-Generated T-Shirt 1', price: 20 },
  { id: 2, name: 'AI-Generated T-Shirt 2', price: 25 },
  { id: 3, name: 'AI-Generated T-Shirt 3', price: 30 },
];

// Dummy recommendation logic
function getRecommendations(userId) {
  // For now, return a random subset of products
  return products.slice(0, 2);
}

// Get recommendations for a user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const recommendations = getRecommendations(userId);
  res.json(recommendations);
});

module.exports = router;
