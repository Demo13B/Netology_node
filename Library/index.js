const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const booksRouter = require('./routers/books');
const userRouter = require('./routers/users');
const indexRouter = require('./routers/index');
const booksEJSRouter = require('./routers/books-ejs');
const err404 = require('./middleware/404');
const logger = require('./middleware/logger');
const verify = require('./middleware/auth');
const User = require('./models/users');

passport.use('local', new LocalStrategy({}, verify));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (e) {
        done(e);
    }
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.use(session({ secret: 'SECRET' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger);

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.use('/', indexRouter);
app.use('/books', booksEJSRouter)

app.use('/', err404);

const port = process.env.LIBRARY_PORT || 3000;
const urlDB = process.env.MONGO_URL || 'mongodb://root:pass@mongo:27017/'

const start = async (port, urlDB) => {
    try {
        await mongoose.connect(urlDB);
        console.log('Connected to mongo');
        app.listen(port);
        console.log(`App listening on port: ${port}`);
    } catch (e) {
        console.error(e);
    }
}

start(port, urlDB);