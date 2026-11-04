const socketIO = require('socket.io');
const Book = require('../models/books');
const Comment = require('../models/comments');

const port = process.env.LIBRARY_PORT || 3000;

async function createSocket(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        socket.on('message', async (msg) => {
            console.log(msg);
            const book = await Book.findById(msg.book);
            if (!book) return;
            const newComment = new Comment({
                book: msg.book,
                message: msg.message,
                createdAt: msg.createdAt
            });

            try {
                await newComment.save();
                socket.broadcast.emit('message', msg);
                socket.emit('message', msg);
            } catch (e) {
                console.log(e);
                return;
            }
        });
    });
}

module.exports = createSocket;