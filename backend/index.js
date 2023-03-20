const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const User = require("./models/userModel");
const models = require("./models/userModel")
const socket = require("socket.io");
//const { UserAddOutlined } = require("@ant-design/icons");
const { findUser } = require("./controllers/userController");
const router = require("./routes/auth");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// app.get('/user', (req, res) => {
//   User.find({ username: req.query.username }).limit(1).exec((err, user) => {
//     if (err) return res.status(500).send(err);
//     return res.status(200).json(user);
//   });
// });

app.post('/user', (req, res) => {
  const username = req.query.username;
  User.find({ username: username }).limit(1).exec((err, user) => {
    if (err) {
        return res.status(500).send(err);
    }
    return res.status(200).json(user);
  });
});


mongoose
  .connect("mongodb+srv://muhammad:apple1010@cluster0.jibr8ni.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
