const {getUsers,getConversationId} = require('../services/user.services');

exports.getUsers = async(req,res,next)=>{
    try {
        
        const response = await getUsers({userId:req.userId});
        res.status(response.statusCode).send({userList:response.userList})
        
    } catch (error) {
        next(error)
    }
}

exports.getConversationId = async(req,res,next)=>{
    try {
        
         
        const response = await getConversationId({userId:req.userId,selectedUserId:req.query.selectedUserId});
        res.status(response.statusCode).send({conversationId:response.conversationId})
        
    } catch (error) {
        next(error)
    }
}