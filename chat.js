// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  console.log('A user connected:', socket.id);

  // Relay messages to the intended recipient or broadcast
  socket.on('chatMessage', data => {
    // data should include: {sender, message, timestamp, room}
    console.log('Message received:', data);
    // Broadcast the message to everyone in the room (or implement private messaging)
    io.to(data.room).emit('chatMessage', data);
  });

  socket.on('joinRoom', room => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:5500');
});
