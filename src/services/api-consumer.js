import config from '/config.js'
import { HTTP_STATUS } from '../constants.js'

const url = config.api.url

/**
 * Método que encapsula las peticiones al api rest
 * @param { String } method HTTP request method to use
 * @param { String } endpoint Endpoint of api to make the request
 * @param { JSON | null } data Object to send in case of any
 * @returns { Promise<JSON | String> } Returns the promise that will be fullfiled with the fetch response
 */
const request = async (method, endpoint, data = null) => {

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null
    }

    const response = await fetch(`${url}${endpoint}`, options)

    if (response.ok) {
        const responseType = response.headers.get('content-type')

        return responseType && responseType.includes('application/json')
            ? response.json()
            : response.text()
    }

    throw new Error(response.text)
}

/**
 * GET request for the api
 * @param {String} endpoint Endpoint to make the request in the api
 * @returns {Promise<JSON>} Returns the api response as JSON
 */
export const get = (endpoint) => {
    return request('GET', endpoint)
}

/**
 * POST request for the api
 * @param {String} endpoint Endpoint to make the request in the api
 * @param {JSON} data Data sent in the request as JSON
 * @returns {Promise<JSON>} Returns the api response as JSON
 */
export const post = (endpoint, data) => {
    return request('POST', endpoint, data)
}

/**
 * PUT request for the api
 * @param {String} endpoint Endpoint to make the request in the api
 * @param {JSON} data Data sent in the request as JSON
 * @returns {Promise<String>} Returns the api response
 */
export const put = (endpoint, data) => {
    return request('PUT', endpoint, data)
}

/**
 * Creates an event stream with the api server
 * @param {String} endpoint Endpoint to create the server event 
 * @returns {EventSource} Returns the event stream with the api
 */
export const event = (endpoint) => {
    return new EventSource(`${url}${endpoint}`)
}