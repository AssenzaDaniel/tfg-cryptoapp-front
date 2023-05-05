const express = require('express')
const config = require('./config.js');
const { log } = require('console');

require("dotenv").config()
const passport = require("passport")
require("./passportConfig")(passport)
const jwt = require("jsonwebtoken")

const cors = require('cors')

const hostname = config.app.hostname;
const port = config.app.port;
const app = express()

app.use(express.static(`${__dirname}/src/`));
app.use(cors());
app.listen(port, hostname)

// app.listen(port, () => {
//     console.info(`\n>> server running at http://${hostname}:${port}/`)
// })

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/src/table.html`)
})





app.get(
    '/login/google',
    passport.authenticate('auth-google', { scope: [ 'profile', 'email' ] })
)

app.get(
    '/oauth2/redirect/google',
    passport.authenticate('auth-google', { session: false }),
    (request, response) => {
        jwt.sign(
            { user: request.user },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) {
                    return response.status(400).send({msg : 'Error'})
                }
                // response.json({ token })
                console.log(token)
                response.redirect('/')
                return token
            }
        )
    }
)

// app.get(
//     "/dashboard",
//     passport.authenticate("jwt"),
//     (request, response, next) => {
//         response.sendFile(`${__dirname}/login.html`)
//     }
// )

console.info(`\n>> server running at http://${hostname}:${port}/`)