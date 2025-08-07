
const { createRoom, joinRoom } = require('../services/xox.services');

module.exports = (io, socket, onlineUsers) => {


    socket.on('createRoom', async ({ roomId }) => {

        try {
            console.log(roomId)
            let res_createRoom = await createRoom({ roomId: roomId, userId: socket.user?._id })
            if (res_createRoom.statusCode == 200) {
                socket.join(roomId);
                socket.emit('res_roomCreated', {
                    roomConfig: res_createRoom.xoxRoom
                })
            }

        } catch (error) {
            console.log(error)

        }




    })


    socket.on('joinRoom', async ({ roomId }) => {
        try {


            const room = io.sockets.adapter.rooms.get(roomId);
            console.log(room)
            const count = room ? room.size : 0;
            console.log(`Number of sockets in room ${roomId}:`, count);
            if (count > 2) {
                socket.emit('error_joinRoomError', {
                    message: "Room full"
                })
            } else {

                let res = await joinRoom({ roomId: roomId, userId: socket.user?._id })

                if (res.statusCode == 200) {
                    socket.join(roomId)
                    io.to(roomId).emit('joinedRoom', {
                        roomConfig: res.xoxRoom
                    })
                }

            }


        } catch (error) {
            console.log(error)
        }
    })

    socket.on('makeMove',({roomId})=>{
        try {
            
            console.log(roomId)

        } catch (error) {
            
        }
    })

}
