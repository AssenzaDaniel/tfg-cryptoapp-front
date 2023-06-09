const express = require('express')
const config = require('./config.js')
const fs = require('fs')
const generateAssets = require('./assets-generator.js')

const hostname = config.app.hostname
const port = config.app.port
const app = express()

fs.writeFileSync(
    `${__dirname}/src/config.js`, 
    `export default ${JSON.stringify(config)}`
)

generateAssets()

app.use(express.static(`${__dirname}/src/`))

app.listen(port, hostname, () => {
    console.info(`\n-- server running at http://${hostname}:${port}/\n`)
})
