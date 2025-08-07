const mongoose = require('mongoose');

const xoxSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    roomId: {
        type: mongoose.Schema.Types.String
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    game: [{
        user: {

            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        symbol:mongoose.Schema.Types.String,
        turn: mongoose.Schema.Types.Boolean
    }

    ],
    board:[]

}, { timestamps: true });

module.exports = mongoose.model('Xox', xoxSchema);
