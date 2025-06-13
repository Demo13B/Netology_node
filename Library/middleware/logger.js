const fs = require('fs');

module.exports = (req, res, next) => {
    const now = (new Date).toTimeString();
    const { url, method } = req;
    const userAgent = req.get('user-agent');

    const log = `${now} \t ${method}: ${url}; \t user-agent: ${userAgent}\n`;
    const path = process.env.ACCESS_LOG_PATH || '/log/access.log';
    fs.appendFile(path, log, (err) => {
        if (err) console.error(err);
    });

    next();
}