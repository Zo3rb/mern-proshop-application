const express = require("express");

const UsersController = require('../controllers/UsersController');
const ProtectRouter = require('../middleware/protect');

const router = express.Router();

router.post('/login', UsersController.authUser);
router.get('/profile', ProtectRouter, UsersController.getProfile);
router.post('/', UsersController.regNewUser);

module.exports = router;
