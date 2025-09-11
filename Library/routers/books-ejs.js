const express = require('express');

const { storage } = require('./books');

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Добавление книги',
        book: {},
        button: 'Создать',
        method: 'POST'
    });
});

router.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const idx = storage.books.findIndex(el => el.id == id);

    res.render('books/create', {
        title: 'Обновление данных',
        book: storage.books[idx],
        button: 'Сохранить',
        method: 'PUT'
    })
});

router.get('/:id/download', (req, res) => {
    const { id } = req.params;
    const book = storage.books.find(b => b.id === id);

    if (!book || !book.fileBook) {
        return res.status(404).send('Файл не найден');
    }

    // fileBook should be the path to the file on the server
    res.download(`${book.fileBook}`, book.fileBook, (err) => {
        if (err) console.error(err);
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const idx = storage.books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
        return;
    }

    await fetch(`http://counter:3001/counter/${storage.books[idx].id}/incr`, {
        method: 'POST'
    });

    const response = await fetch(`http://counter:3001/counter/${storage.books[idx].id}`, {
        method: 'GET'
    });

    const body = await response.json();

    res.render('books/view', { title: 'Просмотр книги', book: storage.books[idx], count: body.count });
});

router.get('/', (req, res) => {
    res.render('books/index', { title: 'Книги', books: storage.books })
});

module.exports = router;