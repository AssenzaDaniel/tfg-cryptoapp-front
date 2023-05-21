import { get } from './cryptoapi.js'

export async function getHottestCrypto() {

    return get('24hrsChanges').then(response => JSON.parse(response))
}