import * as api from './api-consumer.js'

export async function getHottestCrypto() {
    return api.get('/24hrsChanges')
}

export async function search(email, symbol) {
    symbol = symbol.toUpperCase()
    return api.post('/search', { email, symbol })
}

export async function subscribeSymbol(data) {
    return api.put('/subscribe', data)
}

export async function getSubscriptions(email) {
    return api.post('/subscriptions', { email })
}