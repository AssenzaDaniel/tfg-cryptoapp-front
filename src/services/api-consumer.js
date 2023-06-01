import { HTTP_STATUS } from '../constants.js'

const url = 'http://localhost:1717/api'

/**
 * 
 * @param { String } method HTTP request method to use
 * @param { String } endpoint Endpoint of api to make the request
 * @param { JSON | null } data Object to send in case of any
 * @returns 
 */
const request = (method, endpoint, data = null) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        if (data) {
            data = JSON.stringify(data)
        }
        
        xhr.open(method, `${url}${endpoint}`)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.responseType = 'json'
        xhr.send(data)

        xhr.onload = () => {
            xhr.status === HTTP_STATUS.OK
                ? resolve(xhr.response)
                : reject(xhr.status)
        }

        xhr.onerror = () => reject(xhr.status)
    })
}

export const get = (endpoint) => {
    return request('GET', endpoint)
}

export const post = (endpoint, data) => {
    return request('POST', endpoint, data)
}

export const put = (endpoint, data) => {
    return request('PUT', endpoint, data)
}