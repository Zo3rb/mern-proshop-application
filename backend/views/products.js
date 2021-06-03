const express = require("express");

const ProductsController = require('../controllers/ProductsController');
const ProtectRouter = require('../middleware/protect');
const AdminRouter = require('../middleware/admin');

const router = express.Router();

router.get('/', ProductsController.fetchAllProducts);
router.post('/', ProtectRouter, AdminRouter, ProductsController.createProductByAdmin);
router.get('/:id', ProductsController.getProductById);
router.put('/:id', ProtectRouter, AdminRouter, ProductsController.updateProductByAdmin);
router.delete('/:id', ProtectRouter, AdminRouter, ProductsController.deleteProductByAdmin);

module.exports = router;
