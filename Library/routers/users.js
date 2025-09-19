const express = require('express');
const passport = require('passport');

const User = require('../models/users');

const router = express.Router();

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/api/user/login' }),
    (req, res) => {
        res.status(201).json(req.user);
    }
);

router.post('/signup', async (req, res) => {
    const {
        username,
        password,
        mail
    } = req.body;

    try {
        const user = await User.insertOne({
            username: username,
            password: password,
            mail: mail
        });

        res.status(201).json(user);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.get('/logout', async (req, res) => {
    req.logOut(() => { });
    res.json('OK');
});

router.get('/login', async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    res.render('users/login');
});

router.get('/signup', async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    res.render('users/signup');
});

router.get('/me', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/user/login');
    }

    res.render('users/me', { title: 'Профиль', user: req.user });
});

module.exports = router;