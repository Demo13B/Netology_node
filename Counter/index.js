const express = require("express");
const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379'
});

const app = express();

app.get('/counter/:bookId', async (req, res) => {
    const id = req.params.bookId;

    await client.connect()
    const result = await client.get(id);
    client.quit();

    if (result === null) {
        res.json({ count: 0 });
        return;
    }

    res.json({ count_test: result });
});

app.post('/counter/:bookId/incr', async (req, res) => {
    const id = req.params.bookId;

    await client.connect();
    const current = await client.get(id);
    await client.set(id, current + 1);
    client.quit();

    res.status(201).json({ count: current + 1 });
});

const port = process.env.COUNTER_PORT || 3001;

app.listen(port);
console.log(`App listening at port: ${port}`);