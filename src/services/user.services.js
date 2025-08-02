const mongoose = require('mongoose')

const User = require('../Models/User');
const Conversation = require('../Models/Conversation');
const Message = require('../Models/Message')


const AppError = require('../utils/AppError');




exports.toogleUserStatus = async ({ userId, status }) => {

    try {

        await User.findByIdAndUpdate(userId, {
            $set: {
                isOnline: status
            }
        });

        return { statusCode: 200 }


    } catch (error) {
        return { statusCode: 500, message: error.message }
    }

}

exports.getUsers = async ({ userId }) => {

    try {

        const usersFromDb = await User.find({ _id: { $ne: new mongoose.Types.ObjectId(userId) } }, { username: 1, isOnline: 1 });

        return { statusCode: 200, userList: usersFromDb }

    } catch (error) {
        throw new AppError(error.message, error.statusCode || 500);
    }


}



exports.getConversationId = async ({ userId, selectedUserId }) => {

    try {

       let conversationId = null;
        
        const conversationDetailsFromDb = await Conversation.findOne({
            participants: {
                $all: [
                    new mongoose.Types.ObjectId(userId),
                    new mongoose.Types.ObjectId(selectedUserId)

                ]
            }
        }, { _id: 1 });

        if (!conversationDetailsFromDb) {

            let participants = [userId, selectedUserId]
            const conversationObj = await Conversation.create({ participants });
            conversationId = conversationObj._id;


        }else{
           conversationId = conversationDetailsFromDb._id


        }





        return { statusCode: 200, conversationId }

    } catch (error) {
        throw new AppError(error.message, error.statusCode || 500);
    }


}


