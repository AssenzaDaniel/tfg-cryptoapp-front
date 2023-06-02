import * as api from './api-consumer.js'

export async function getSymbols() {
    return api.get('/symbols')
}

export async function getUpdates(symbols) {
    return api.event(`/symbols/updates?symbols=${JSON.stringify(symbols)}`)
}

export async function search(email, symbol) {
    symbol = symbol.toUpperCase()
    return api.post('/search', { email, symbol })
}

export async function subscribeSymbol(email, symbol) {
    return api.put('/subscriptions', { email, symbol })
}

export async function getSubscriptions(email) {
    return api.post('/subscriptions/list', { email })
}

export async function getSubscriptionsSymbols() {
    const email = sessionStorage.getItem('email')

    return api.post('/subscriptions/symbols', { email })
}