const express = require('express');
const router = express.Router();

const { checkUserToken } = require('../middlewares/userTokenVerification');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const chatRoutes = require('./chat.routes');

router.use('/auth', authRoutes);   
router.use('/user',checkUserToken,userRoutes);
router.use('/message',checkUserToken,chatRoutes)


module.exports = router;
