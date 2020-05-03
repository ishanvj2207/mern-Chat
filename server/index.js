const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const cors = require('cors');

const { addUser, getUser, removeUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('Connection !!!');

  socket.on('join', ({ name, room }, callback) => {
    // console.log(name, room);

    const { user, error } = addUser(socket.id, name, room);
    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `Welcome to the ${user.room} Room` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` });

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('Disconnected !!');

    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
