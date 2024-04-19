const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

// const users = [
//   { username: "U1", password: "password1" },
//   { username: "U2", password: "password2" },
// ];

// const authenticate = (req, res, next) => {
//   const { username, password } = req.query;
//   const user = users.find(
//     (user) => user.username === username && user.password === password
//   );
//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     res.status(401).send("Authentication failed");
//   }
// };

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Connected...");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
