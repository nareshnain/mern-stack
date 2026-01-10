require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Server } = require("socket.io");
const http = require("http");
const path = require('path');
const dbConfig = require('./config/database.config.js');
const ChatMessage = require("./model/ChatMessage");

const app = express();
const PORT = 3000;

app.use(cors()); // This allows all origins (Access-Control-Allow-Origin: *)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    // useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

const UserRoute = require('./routes/User');
app.use('/user', UserRoute);
app.use('/login', require('./routes/Auth'));

const SampleRoute = require('./routes/Sample');
app.use('/sample', SampleRoute);

const UploadRoute = require('./routes/Upload');
app.use('/chat', UploadRoute);

app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});

// To serve static image files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const { specs, swaggerUi } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Simple route to get saved messages
app.get("/messages", async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error("GET /messages error:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Socket.IO handlers
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("sendMessage", async (data) => {
    try {
      const { user, message, imageUrl, fileUrl, fileType } = data;
      const chatMessage = new ChatMessage({ user, message, imageUrl, fileUrl, fileType });
      await chatMessage.save();
      // Emit to everyone (including sender)
      io.emit("message", chatMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("A user disconnected:", socket.id, reason);
  });
});

server.listen(PORT, () => {
    console.log("Server is listening on port 3000");
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

