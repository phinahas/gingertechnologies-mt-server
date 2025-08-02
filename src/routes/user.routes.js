const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


// POST /api/user/get-users
router.get('/', userController.getUsers);

//GET /api/user/get-conversation-id
router.get('/get-conversation-id',userController.getConversationId);



module.exports = router;
