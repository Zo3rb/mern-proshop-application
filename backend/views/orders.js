const express = require("express");

const OrdersController = require('../controllers/OrdersController');
const ProtectRouter = require('../middleware/protect');
const AdminRouter = require('../middleware/admin');

const router = express.Router();

router.post('/', ProtectRouter, OrdersController.createOrder);
router.get('/', ProtectRouter, AdminRouter, OrdersController.listAllOrdersForAdmin);
router.get('/my-orders', ProtectRouter, OrdersController.getMyOrders);
router.get('/:id', ProtectRouter, OrdersController.getSingleOrderById);
router.put('/:id/pay', ProtectRouter, OrdersController.updatePayment);
router.put('/:id/deliver', ProtectRouter, OrdersController.updateDeliverByAdmin);

module.exports = router;
