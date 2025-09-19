const express = require('express');
const passport = require('passport');

const User = require('../models/users');

const router = express.Router();

router.post('/login',
    passport.authenticate('local', { successRedirect: '/' }),
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
    res.render('users/login');
});

router.get('/signup', async (req, res) => {
    res.render('users/signup');
})

module.exports = router;