import { HTTP_STATUS } from '../constants.js'

const url = 'http://localhost:1717/api'

export function get(endpoint) {

    return new Promise((resolve, reject) => {
        const conn = new XMLHttpRequest()
        conn.open('GET', `${url}/${endpoint}`)
        conn.send()

        conn.onreadystatechange = () => {
            if (conn.readyState === conn.DONE && conn.status === HTTP_STATUS.OK) {
                resolve(conn.responseText)
            } else if (conn.readyState === conn.DONE) (
                reject(conn.response)
            )
        }
    })
}