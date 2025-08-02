const mongoose = require('mongoose')

const Message = require('../Models/Message');
const Conversation = require('../Models/Conversation');



const AppError = require('../utils/AppError');




exports.getMessages = async ({ conversationId, skip, limit }) => {
  try {
    
    const messagesFromDb = await Message.aggregate([
      {
        $match: {
          conversationId: new mongoose.Types.ObjectId(conversationId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

   

  
    const totalCount = await Message.countDocuments({ conversationId });

    return {
      statusCode: 200,
      messagesFromDb,
      totalCount,
    };
  } catch (error) {
    throw new AppError(error.message, error.statusCode || 500);
  }
};


exports.addMessage = async ({ userId, message, conversationId }) => {

    try {



        const insertedMessage = await Message.create({
            conversationId: conversationId,
            content: message,
            sender: userId
        });

        const conversation = await Conversation.findById(conversationId);

        const otherParticipants = conversation.participants.filter(
            (id) => id.toString() !== userId.toString()
        );


        return { statusCode: 200, insertedMessage,otherParticipants  }

    } catch (error) {
        throw new AppError(error.message, error.statusCode || 500);
    }

}