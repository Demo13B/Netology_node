const http = require('http');
const url = require('url');
const config = require('./config');

const layoutStart = (`
    <link
      rel="stylesheet" 
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
      crossorigin="anonymous"
    />
      <div class="container pt-5">
  `);

const layoutEnd = `</div>`

const cityRequestForm = () => {
    return `
    <h2> Enter the city name: </h2>  
    <form 
        method="GET"
        action="/city"
    >
        <input
            name="name"
            id="query"
            type="text"
            required
        />
        <button
            class="btn btn-sm btn-success"
            type="submit"
        >
            Show temperature
        </button>
    </form>
    `
};

const returnForm = () => {
    return `
    <form 
        method="GET"
        action="/"
    >
        <button
            class="btn btn-sm btn-danger"
            type="submit"
        >
            Another query
        </button>
    </form>
    `
}

function getData(city) {
    return new Promise((resolve, reject) => {
        http.get(`http://api.weatherstack.com/current?access_key=${config.WEATHER_KEY}&query=${city}`, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk });
            res.on('end', () => { resolve(JSON.parse(data)) });
            return;
        }).on('err', (err) => { reject(err) });
    });
};


const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true)
    const { method } = req;

    res.setHeader('Content-Type', 'text/html; charset=utf-8;');

    if (pathname === '/') {
        if (method === 'GET') {
            res.write(layoutStart);
            res.write(cityRequestForm());
            res.write(layoutEnd);
            res.end();
        } else {
            res.statusCode = 405;
            res.write('<h2>405: Method not allowed</h2>')
            res.end();
        }
    } else if (pathname === '/city') {
        if (method === 'GET') {
            if (!query.name) {
                res.statusCode = 400;
                res.write(`<h2>400 Bad Request: Provide a valid city name</h2>`)
                res.end();
            } else {
                getData(query.name)
                    .then((response) => {
                        if (response.success == false) {
                            res.statusCode = 400;
                            res.write(`<h2>City not found</h2>`);
                            res.write(returnForm());
                            res.end();
                        } else {
                            res.write(layoutStart);
                            res.write(`<h2>Temperature in ${query.name}: ${response.current.temperature} °C</h2>`)
                            res.write(returnForm());
                            res.write(layoutEnd);
                            res.end();
                        }
                    })
                    .catch((error) => {
                        res.statusCode = 400;
                        res.write(error);
                        res.end();
                    });
            }
        } else {
            res.statusCode = 405;
            res.write('<h2>405: Method not allowed</h2>')
            res.end();
        }
    } else {
        res.statusCode = 404;
        res.write(`<h2>404: Not Found</h2>`);
        res.end();
    }
});

server.listen(config.PORT);
