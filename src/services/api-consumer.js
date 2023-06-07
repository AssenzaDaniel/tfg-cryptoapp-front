import config from '/config.js'
import { HTTP_STATUS } from '../constants.js'

const url = config.api.url

/**
 * 
 * @param { String } method HTTP request method to use
 * @param { String } endpoint Endpoint of api to make the request
 * @param { JSON | null } data Object to send in case of any
 * @returns 
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

        console.log(...response.headers)
        const responseType = response.headers.get('content-type')

        return responseType && responseType.includes('application/json')
            ? response.json()
            : response.text()
    }

    throw new Error(response.text)
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

export const event = (endpoint) => {
    return new EventSource(`${url}${endpoint}`)
}