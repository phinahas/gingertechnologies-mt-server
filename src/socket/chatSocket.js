
const { addMessage } = require('../services/chat.services');

const { toogleUserStatus } = require('../services/user.services')

module.exports = (io, socket, onlineUsers) => {





    socket.on("disconnect", async () => {
        console.log("🔴 Socket disconnected:", socket.id, "User:", socket.user?.username);
        await toogleUserStatus({ userId: socket.user._id, status: false });
        onlineUsers.delete(socket.user?._id.toString()); 
        socket.broadcast.emit("user_offline", { user: { username: socket.user.username, _id: socket.user._id } })

    })


    socket.on("send_message", async ({ conversationId, content }) => {

        try {

           
            let res = await addMessage({ conversationId: conversationId, message: content, userId: socket.user._id });
            if (!socket.rooms.has(conversationId)) {
                socket.join(conversationId);
            }

            
            if (res.otherParticipants.length > 0) {
                const otherParticipantSocketId = onlineUsers.get(res.otherParticipants[0].toString());
                
                if (otherParticipantSocketId) {
                    const otherParticipantSocket = io.sockets.sockets.get(otherParticipantSocketId);
                    otherParticipantSocket.join(conversationId);
                    otherParticipantSocket.emit("new_conversation_started", { sender: res.insertedMessage.sender });
                }
            }
            socket.to(conversationId).emit("receive_message", { message: res.statusCode == 200 ? res.insertedMessage : {} });

        } catch (error) {
            console.log(error)
        }



    })




}
