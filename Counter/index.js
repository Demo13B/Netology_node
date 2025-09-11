const express = require("express");
const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379'
});

const app = express();

app.get('/counter/:bookId', async (req, res) => {
    const id = req.params.bookId;

    await client.connect()
    const result = Number(await client.get(id));
    client.quit();

    res.json({ count: result });
});

app.post('/counter/:bookId/incr', async (req, res) => {
    const id = req.params.bookId;

    await client.connect();
    const current = Number(await client.get(id));
    await client.set(id, Number(current) + 1);
    client.quit();

    res.status(201).json({ count: current + 1 });
});

const port = process.env.COUNTER_PORT || 3001;

app.listen(port);
console.log(`App listening at port: ${port}`);