const express = require('express');
const { v4: uuid } = require('uuid');
const fs = require('fs');

const fileFetcher = require('../middleware/file');

class Book {
    constructor(
        title = "",
        description = "",
        authors = "",
        favorite = false,
        fileCover = "",
        fileName = "",
        fileBook = "",
        id = uuid()
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
    };
}

const storage = {
    books: []
}

const router = express.Router();

router.get('/', (req, res) => {
    res.json(storage.books);
});

router.get('/:id/download', (req, res) => {
    const { id } = req.params;
    const { books } = storage;

    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.download(books[idx].fileBook, 'book.pdf', (err) => {
            if (err) console.error(err);
        });
    } else {
        res.status(404).send('The book is not found');
    }
});

router.get('/:id', (req, res) => {
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


router.post('/', fileFetcher.single('book-file'), (req, res) => {
    if (req.file == undefined) {
        res.sendStatus(400);
        return;
    }

    const { books } = storage;
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;
    const fileBook = req.file.path;

    const book = new Book(
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    );

    books.push(book);
    res.status(201).json(books.at(-1));
});


router.put('/:id', fileFetcher.single('book-file'), (req, res) => {
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
        let fileBook = '';

        if (req.file) {
            fs.unlink(books[idx].fileBook, (err) => {
                if (err) console.error(err);
            });

            fileBook = req.file.path;
        } else {
            fileBook = books[idx].fileBook;
        }

        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        };


        res.json(books[idx]);
    } else {
        if (req.file) {
            fs.unlink(fileBook, (err) => {
                if (err) console.error(err);
            });
        }

        res.status(404).send('The book is not found');
    }
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { books } = storage;

    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        fs.unlink(books[idx].fileBook, (err) => {
            if (err) console.error(err);
        });

        books.splice(idx, 1);
    }

    res.send('ok');
});


module.exports = { router, storage };