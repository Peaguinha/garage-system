const express = require('express');

const authController = require('../controllers/authController');
const adminOrFirstUserMiddleware = require('../middlewares/adminOrFirstUserMiddleware');

const router = express.Router();

router.post('/usuarios', adminOrFirstUserMiddleware, authController.criarUsuario);
router.post('/login', authController.login);

module.exports = router;