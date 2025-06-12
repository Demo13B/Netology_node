const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
    constructor(
        title = "",
        description = "",
        authors = "",
        favorite = "",
        fileCover = "",
        fileName = "",
        id = uuid()
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    };
}

const storage = {
    books: []
}

const user = {
    id: 1,
    mail: 'test@mail.ru',
}

app = express();
app.use(express.json());


app.post('/api/user/login', (req, res) => {
    res.status(201).json(user);
});


app.get('/api/books', (req, res) => {
    res.json(storage.books);
});


app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { books } = storage;

    for (let book of books) {
        if (book.id === id) {
            res.json(book);
            return;
        }
    }

    res.status(404).send('The book is not found');
});


app.post('/api/books', (req, res) => {
    const { books } = storage;
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    const book = new Book(
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    );

    books.push(book);
    res.status(201).json(books.at(-1));
});


app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { books } = storage;
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        };


        res.json(books[idx]);
    } else {
        res.status(404).send('The book is not found');
    }
});


app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { books } = storage;

    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
    }

    res.send('ok');
});


port = process.env.LIBRARY_PORT || 3000;
app.listen(port);