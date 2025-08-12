const mongoose = require('mongoose')

const Xox = require('../Models/Xox');
const helpers = require('../helpers/xox.helpers')

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

exports.makeMove = async ({ roomId, userId, row, col }) => {
    try {

        let currentBoard = await Xox.findOne({ roomId: roomId }, { board: 1, game: 1 });
        let activeUser = currentBoard.game.find((game) => game.turn == true)
        const newBoard = [...currentBoard.board];
        let winner = null;
        if (newBoard[row][col] != '') {
              let updatedDoc = await Xox.findOneAndUpdate(
            { roomId: roomId,
             "game.user": new mongoose.Types.ObjectId(userId) 
            },
            { $set: { "game.$.turn": true } },
            { new: true }
        );

        return {
            statusCode: 200,
            xoxRoom: {
                game: updatedDoc.game,
                board:updatedDoc.board,
                winner:winner
            }
        }
        }
        newBoard[row][col] = activeUser.symbol;
        
        const checkWinner = helpers.checkWinner({board:newBoard});
        const checkIsBoardComplete = helpers.checkIsDraw({board:newBoard});
       
        if (checkWinner.statusCode == 200) {

            if (checkWinner.foundWinner) winner = activeUser;
            

        }

        let draw = false;

        if(winner != null && draw) draw = true;


        await Xox.updateOne(
            { roomId: roomId },
            {
                $set: {
                    "game.$[].turn": true,
                    winner:winner,
                    board:newBoard
                }
            }
        )

        let updatedDoc = await Xox.findOneAndUpdate(
            { roomId: roomId,
             "game.user": new mongoose.Types.ObjectId(userId) 
            },
            { $set: { "game.$.turn": false } },
            { new: true }
        );

        return {
            statusCode: 200,
            xoxRoom: {
                game: updatedDoc.game,
                board:updatedDoc.board,
                winner:winner,
                draw:draw
            }
        }

    } catch (error) {
        console.log(error)
        return { message: error.message, statusCode: error.statusCode || 500 }

    }
}

