// middlewares/socketAuthMiddleware.js
const jwt = require("jsonwebtoken");
const { checkUserExists } = require("../services/auth.services");

const socketAuthMiddleware = async (socket, next) => {
  const token = socket.handshake.auth?.token;
  

  if (!token) {
    console.log("❌ No token provided");
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const response = await checkUserExists({ userId: decoded.userId });

    if (response.statusCode != 200) {
      console.log("❌ User not found");
      return next(new Error(response.message));
    }

    
    socket.user = response.user;

    next(); 

  } catch (err) {
    console.log("❌ Invalid token", err.message);
    return next(new Error("Authentication error"));
  }
};

module.exports = socketAuthMiddleware;
