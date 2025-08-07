const mongoose = require('mongoose')

const Xox = require('../Models/Xox');

const AppError = require('../utils/AppError');


exports.createRoom = async ({ roomId, userId }) => {
    try {

        let board = [

            ['', '', ''],
            ['', '', ''],
            ['', '', ''],

        ]

        const roomCreateed = await Xox.create({
            roomId: roomId,
            participants: [userId],
            game: {
                user: userId,
                symbol: 'X',
                turn: true
            },
            board: board
        })

        return { statusCode: 200, xoxRoom: roomCreateed }

    } catch (error) {
        return { message: error.message, statusCode: error.statusCode || 500 }
        throw new AppError(error.message, error.statusCode || 500);

    }
}

exports.joinRoom = async ({ roomId, userId }) => {
    try {

        console.log(roomId, userId)
      let res = await Xox.findOneAndUpdate(
    { roomId: roomId },
    {
        $push: {
            participants: new mongoose.Types.ObjectId(userId),
            game: {
                user: new mongoose.Types.ObjectId(userId),
                symbol: 'O',
                turn: false
            }
        }
    },
    { new: true }
);
       
        return { statusCode: 200, xoxRoom: res }

    } catch (error) {
        console.log(error)
        return { message: error.message, statusCode: error.statusCode || 500 }
        throw new AppError(error.message, error.statusCode || 500);
    }
}

exports.makeMove = async ({ roomId, userId }) => {
    try {

        await Xox.updateOne(
            { roomId: roomId },
            {
                $set: {
                    "game.$[].turn": false
                }
            }
        )

        let updatedDoc = await Xox.findOneAndUpdate(
            { roomId: roomId, "game.user": new mongoose.Schema.Types.ObjectId(userId) },
            { $set: { "game.$.turn": true } },
            { new: true }
        );

        return {
            statusCode: 200,
            xoxRoom: {
                game: updatedDoc.game
            }
        }

    } catch (error) {
        return { message: error.message, statusCode: error.statusCode || 500 }

    }
}