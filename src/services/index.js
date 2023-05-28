import * as api from './cryptoapi.js'

export async function getHottestCrypto() {
    return api.get('/24hrsChanges')
}