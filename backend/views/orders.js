const express = require("express");

const OrdersController = require('../controllers/OrdersController');
const ProtectRouter = require('../middleware/protect');

const router = express.Router();

router.post('/', ProtectRouter, OrdersController.createOrder);
router.get('/my-orders', ProtectRouter, OrdersController.getMyOrders);
router.get('/:id', ProtectRouter, OrdersController.getSingleOrderById);
router.put('/:id/pay', ProtectRouter, OrdersController.updatePayment);

module.exports = router;
