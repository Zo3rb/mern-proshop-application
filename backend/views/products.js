const express = require("express");

const ProductsController = require('../controllers/ProductsController');

const router = express.Router();

router.get('/', ProductsController.fetchAllProducts);
router.get('/:id', ProductsController.getProductById);

module.exports = router;
