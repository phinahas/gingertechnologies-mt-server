const chatSocket = require('./chatSocket');
const socketAuthMiddleware = require('../middlewares/socketAuthVerification');

const { toogleUserStatus } = require('../services/user.services');
const XoxSocket = require('./XoxSocket');

const socketSetup = (io) => {

  const onlineUsers = new Map();


  io.use(socketAuthMiddleware); 


  io.on("connection", async (socket) => {
    console.log("🟢 New socket connected:", socket.id, "User:", socket.user?.username);

    const userId = socket.user._id.toString();
    onlineUsers.set(userId, socket.id); 
   
    console.log(onlineUsers)
    await toogleUserStatus({ userId: socket.user._id, status: true })
    socket.broadcast.emit("user_online", { user: { username: socket.user.username, _id: socket.user._id } })
    


   
    chatSocket(io, socket, onlineUsers);
    XoxSocket(io,socket,onlineUsers);
  });


  
};

module.exports = socketSetup;
