const express = require('express');

const library_port = process.env.LIBRARY_PORT || 3000;

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Добавление книги',
        book: {},
        button: 'Создать',
        method: 'POST'
    });
});

router.get('/update/:id', async (req, res) => {
    const { id } = req.params;

    const response = await fetch(`http://localhost:${library_port}/api/books/${id}`, {
        method: 'GET'
    });

    const body = await response.json();

    res.render('books/create', {
        title: 'Обновление данных',
        book: body,
        button: 'Сохранить',
        method: 'PUT'
    })
});

router.get('/:id/download', async (req, res) => {
    const { id } = req.params;

    const response = await fetch(`http://localhost:${library_port}/api/books/${id}`, {
        method: 'GET'
    });

    const book = await response.json();


    if (!book || !book.fileBook) {
        return res.status(404).send('Файл не найден');
    }

    // fileBook should be the path to the file on the server
    res.download(`${book.fileBook}`, `${book.title}.pdf`, (err) => {
        if (err) console.error(err);
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const book_response = await fetch(`http://localhost:${library_port}/api/books/${id}`, {
        method: 'GET'
    });

    if (!book_response.ok) {
        res.redirect('/404');
        return;
    }

    const book = await book_response.json();

    const counter_port = process.env.COUNTER_PORT || 3001;
    await fetch(`http://counter:${counter_port}/counter/${book.id}/incr`, {
        method: 'POST'
    });

    const response = await fetch(`http://counter:${counter_port}/counter/${book.id}`, {
        method: 'GET'
    });

    const body = await response.json();

    res.render('books/view', { title: 'Просмотр книги', book: book, count: body.count });
});

router.get('/', async (req, res) => {
    const book_response = await fetch(`http://localhost:${library_port}/api/books`, {
        method: 'GET'
    });

    const books = await book_response.json();

    res.render('books/index', { title: 'Книги', books: books })
});

module.exports = router;