const express = require('express');

const booksRouter = require('./routers/books');
const userRouter = require('./routers/users');
const err404 = require('./middleware/404');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());

app.use(logger);

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.use('/', err404);

port = process.env.LIBRARY_PORT || 3000;
app.listen(port);