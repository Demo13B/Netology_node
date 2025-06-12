const http = require('http');

const myAPIKey = process.env.API_KEY;
const url = `http://data.fixer.io/api/latest?access_key=${myAPIKey}&symbols=USD,EUR,RUB`;

http.get(url, (res) => {
    console.log(res.statusCode);

    if (res.statusCode !== 200) {
        return;
    }

    let data = '';
    res.on('data', (chunk) => { data += chunk });
    res.on('end', () => { console.log(JSON.parse(data)) });
    return;
});