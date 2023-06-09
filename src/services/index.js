import * as api from './api-consumer.js'

/**
 * @returns simbolos como JSON
 */
export async function getSymbols() {
    return api.get('/symbols')
}

/**
 * @returns Datos del simbolo solicitado
 */
export async function getSymbol(symbol) {
    return api.get(`/symbols/${symbol}`)
}

/**
 * @param {Array<String>} symbols simbolos de los que solicitar datos
 * @returns datos de los simbolos solicitados
 */
export async function getUpdates(symbols) {
    return api.event(`/symbols/updates?symbols=${JSON.stringify(symbols)}`)
}

/**
 * @param {String} email email utilizado para obtener los datos del usuario
 * @param {String} symbol simbolo a buscar
 * @returns simbolos que retorna la búsqueda
 */
export async function search(symbol) {
    const email = sessionStorage.getItem('email')
    symbol = symbol.toUpperCase()

    return api.post('/search', { email, symbol })
}

/**
 * @param {String} email email del usuario
 * @param {String} symbol simbolo al cual subscribirse
 * @returns promesa con la petición, si devuelve error la subscripcion
 * no se ha realizado correctamente
 */
export async function subscribeSymbol(symbol) {
    const email = sessionStorage.getItem('email')

    return api.put('/subscriptions', { email, symbol })
}

/**
 * @param {String} email email del usuario
 * @returns nombre de los simbolos a los que el usuario está suscrito como array
 */
export async function getSubscriptions() {
    const email = sessionStorage.getItem('email')

    return api.post('/subscriptions/list', { email })
}

/**
 * @returns simbolos a los que el usuario está suscrito
 */
export async function getSubscriptionsSymbols() {
    const email = sessionStorage.getItem('email')

    return api.post('/subscriptions/symbols', { email })
}

export async function logUser(userData) {
    return api.post('/user/login', userData)
}