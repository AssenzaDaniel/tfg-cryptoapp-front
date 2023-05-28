import { HTTP_STATUS } from '../constants.js'

const url = 'http://localhost:1717/api'

export function get(endpoint) {

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        
        xhr.responseType = 'json'
        xhr.open('GET', `${url}${endpoint}`)
        xhr.send()

        xhr.onload = () => resolve(xhr.response)
        xhr.onerror = () => reject(xhr.responseText)
    })
}