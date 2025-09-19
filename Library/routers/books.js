const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const fileFetcher = require('../middleware/file');
const { mongoIdCheck } = require('../middleware/validator');
const Book = require('../models/books');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().select('-__v');
        res.json(books);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/:id/download', mongoIdCheck, async (req, res) => {
    const { id } = req.params;

    const book = await Book.findById(id).select('-__v');

    if (book !== null) {
        res.download(book.fileBook, `${book.title}.pdf`, (err) => {
            if (err) console.error(err);
        });
    } else {
        res.status(404).send('The book is not found');
    }
});

router.get('/:id', mongoIdCheck, async (req, res) => {
    const { id } = req.params;

    const book = await Book.findById(id).select('-__v');

    if (book !== null) {
        res.json(book);
    } else {
        res.status(404).send('The book is not found');
    }
});


router.post('/', fileFetcher.single('book-file'), async (req, res) => {
    if (req.file == undefined) {
        res.sendStatus(400);
        return;
    }

    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;
    const fileBook = req.file.path;

    const newBook = new Book({
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    });

    try {
        await newBook.save()
        res.status(201).json(newBook);
    } catch (e) {
        res.status(500).json(e);
    }
});


router.put('/:id', fileFetcher.single('book-file'), mongoIdCheck, async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    if (req.file == undefined) {
        try {
            const new_data = {
                title,
                description,
                authors,
                favorite,
                fileCover,
                fileName
            }
            const book = await Book.findByIdAndUpdate(id, new_data)
            res.json(book);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        const fileBook = req.file.path;

        try {
            const book = await Book.findById(id).select('fileBook');
            fs.unlink(book.fileBook, (err) => {
                if (err) console.error(err);
            });
        } catch (e) {
            res.status(500).json(e);
        }

        const new_data = {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileBook
        }

        try {
            const book = await Book.findByIdAndUpdate(id, new_data);
            res.json(book);
        } catch (e) {
            res.status(500).json(e);
        }
    }
});


router.delete('/:id', mongoIdCheck, async (req, res) => {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (book !== null) {
        fs.unlink(book.fileBook, (err) => {
            if (err) console.error(err);
        });
    }

    res.send('ok');
});


module.exports = router;