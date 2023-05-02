const express = require('express')
const config = require('./config.js');
const { log } = require('console');

const hostname = config.app.hostname;
const port = config.app.port;
const app = express()

app.use(express.static(`${__dirname}/src/`));
app.listen(port, hostname)

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/src/table.html`)
})

console.info(`\n>> server running at http://${hostname}:${port}/`)