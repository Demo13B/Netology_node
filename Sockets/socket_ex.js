const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

server.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

// room handling
app.get('/:room', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

// socket code
io.on('connection', (socket) => {
    const { id } = socket;
    console.log(id);

    // case for message to self, returns the message back unchanged
    socket.on('message-to-me', (msg) => {
        msg.type = 'me';
        socket.emit('message-to-me', msg);
    });

    // case for message to everyone on the server, broadcasts the messages to everyone and emits a copy to self as well
    socket.on('message-to-all', (msg) => {
        msg.type = 'all';
        socket.broadcast.emit('message-to-all', msg);
        socket.emit('message-to-all', msg); // required to get the full chat with own messages as broadcast only sends to others
    })


    // case for room messages, sends the messages only to room users
    const { roomName } = socket.handshake.query;
    console.log(roomName);
    socket.join(roomName); // !!! important, need to join the room first
    socket.on('message-to-room', (msg) => {
        msg.type = `room: ${roomName}`;
        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg); // required to get the full chat with own messages as to(room) only sends to roommates
    });
});
