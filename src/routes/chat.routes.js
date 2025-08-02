const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');


// GET /api/message/:conversationId
router.get('/:conversationId', chatController.getMessages);





module.exports = router;
