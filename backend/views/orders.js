const express = require("express");

const OrdersController = require('../controllers/OrdersController');
const ProtectRouter = require('../middleware/protect');

const router = express.Router();

router.post('/', ProtectRouter, OrdersController.createOrder);

module.exports = router;
