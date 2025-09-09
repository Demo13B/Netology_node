const express = require('express');

const user = {
    id: 1,
    mail: 'test@mail.ru',
}

const router = express.Router();

router.post('/login', (req, res) => {
    res.status(201).json(user);
});

module.exports = router;