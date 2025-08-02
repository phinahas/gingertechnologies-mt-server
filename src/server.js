const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');


dotenv.config();


const socketSetup  = require("./socket/index");

const connectDB = require('./configurations/db');
const errorMiddleware = require('./middlewares/errorHandler');
const routes = require('./routes');





const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());






app.use('/api', routes);

app.use((req, res, next) => {
  res.status(404).json({
    
    message: "API  not found",
    
  });
});


app.use(errorMiddleware);


socketSetup(io); 


connectDB().then(() => {


    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})

