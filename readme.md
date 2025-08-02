# 💬 Real-Time Chat Application – MERN Stack

This is a real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO. Authenticated users can initiate one-on-one conversations and exchange messages in real-time.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Redux Toolkit, Socket.IO Client, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Socket.IO
- **Authentication:** JWT (for both REST and WebSocket), Bcrypt for password hashing


## 🚀 Getting Started

### 📦 Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/phinahas/gingertechnologies-mt-server.git
   cd backend-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables:**
   - A `.env` file is included.
   - Make sure your local MongoDB instance is running or replace the provided connection string with your own.

   Example:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/chatapp
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the server:**
   ```bash
   npm run dev
   ```

---

### 🌐 Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/phinahas/gingertechnologies-mt-ui.git
   
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the frontend:**
   ```bash
   npm run dev
   ```

---

## 🔑 Features

- User Registration and Login with JWT Authentication
- Real-time 1-on-1 messaging using Socket.IO
- Online/Offline user presence updates
- Secure backend with proper auth middleware
- Organized Redux state for authentication, users, conversations, and messages
- Simple and clean UI layout (user list, chat window, message input)

---

## 📝 Notes

- For backend, ensure MongoDB is running locally or adjust the DB URI accordingly.
- The `.env` file is provided to configure environment variables easily.
- The app uses Socket.IO rooms to manage conversations efficiently.

---


