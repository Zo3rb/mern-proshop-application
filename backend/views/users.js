const express = require("express");

const UsersController = require('../controllers/UsersController');
const ProtectRouter = require('../middleware/protect');
const AdminRouter = require('../middleware/admin');

const router = express.Router();

router.post('/login', UsersController.authUser);
router.get('/profile', ProtectRouter, UsersController.getProfile);
router.put('/profile', ProtectRouter, UsersController.updateProfile);
router.post('/', UsersController.regNewUser);
router.get('/', ProtectRouter, AdminRouter, UsersController.getUsersByAdmin);
router.delete('/:id', ProtectRouter, AdminRouter, UsersController.deleteUserByAdmin);
router.get('/:id', ProtectRouter, AdminRouter, UsersController.getSingleUserByAdmin);
router.put('/:id', ProtectRouter, AdminRouter, UsersController.updateSingleUserByAdmin);

module.exports = router;
