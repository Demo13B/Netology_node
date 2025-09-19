const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/user/login');
    }

    res.render('index', { title: 'Главная' });
});

module.exports = router;