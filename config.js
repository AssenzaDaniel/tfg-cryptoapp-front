const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path: path.resolve(`${process.env.NODE_ENV}.env`)
})

/**
 * @module
 * Modulo con las configuraciones de la app segun el entorno 
 * de desarrollo, para ello hace uso de los archivos de entorno .env
 */
const config = {
    app: {
        hostname: process.env.HOST,
        port: process.env.PORT
    },

    api: {
        hostname: process.env.API_HOST,
        port: process.env.API_PORT,
        url: `http://${process.env.API_HOST}:${process.env.API_PORT}/api`
    }
}

module.exports = config