const {getMessages} = require('../services/chat.services');

exports.getMessages = async(req,res,next)=>{
    try {
        
        const {page} = req.query;
        const limit = 10;
        
        const skip = (page - 1) * 10;

        const response = await getMessages({conversationId:req.params.conversationId,limit,skip});
        res.status(response.statusCode).send({messages:response.messagesFromDb,totalConversations:response.totalCount})
        
    } catch (error) {
        next(error)
    }
}

