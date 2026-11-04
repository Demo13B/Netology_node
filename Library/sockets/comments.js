const socketIO = require('socket.io');

function createSocket(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        socket.on('message', (msg) => {
            console.log(msg);
            socket.broadcast.emit('message', msg);
            socket.emit('message', msg);
        });
    });
}

module.exports = createSocket;