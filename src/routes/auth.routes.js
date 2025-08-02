const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { checkUserToken } = require('../middlewares/userTokenVerification');

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/user
router.get('/user',checkUserToken, authController.getUser);

module.exports = router;
