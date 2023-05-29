import * as api from './api-consumer.js'

export async function getSymbols() {
    return api.get('/symbols')
}

export async function search(email, symbol) {
    symbol = symbol.toUpperCase()
    return api.post('/search', { email, symbol })
}

export async function subscribeSymbol(data) {
    return api.put('/subscriptions', data)
}

export async function getSubscriptions(email) {
    return api.post('/subscriptions', { email })
}