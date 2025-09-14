const express = require('express');

const booksRouter = require('./routers/books');
const userRouter = require('./routers/users');
const indexRouter = require('./routers/index');
const booksEJSRouter = require('./routers/books-ejs');
const err404 = require('./middleware/404');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());

app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use(logger);

app.use('/', indexRouter);
app.use('/books', booksEJSRouter)

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.use('/', err404);

const port = process.env.LIBRARY_PORT || 3000;
app.listen(port);
console.log(`App listening on port: ${port}`);