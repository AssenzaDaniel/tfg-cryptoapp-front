
/*
* https://api.binance.com
* https://api1.binance.com
* https://api2.binance.com
* https://api3.binance.com
* https://api4.binance.com
*/

/*
* GET /api/v3/aggTrades
* GET /api/v3/avgPrice
* GET /api/v3/depth
* GET /api/v3/exchangeInfo
* GET /api/v3/klines
* GET /api/v3/ping
* GET /api/v3/ticker
* GET /api/v3/ticker/24hr
* GET /api/v3/ticker/bookTicker
* GET /api/v3/ticker/price
* GET /api/v3/time
* GET /api/v3/trades
* GET /api/v3/uiKlines
*/

// https://api.binance.com/api/v3/ticker/price
const API_URL = "https://api.binance.com/api/v3"

// Realiza la conexión con la API.
async function consumeBinanceApi (option, callback) {

    const peticion_http = new XMLHttpRequest()

    return new Promise((resolve, reject) => {

        peticion_http.open('GET', `${API_URL}${option}`)
        peticion_http.send(null)
        peticion_http.onreadystatechange = () => {

            if (peticion_http.readyState == 4 && peticion_http.status == 200) {

                resolve(callback(peticion_http.responseText))
            } else if (peticion_http.readyState == 4) {

                reject(peticion_http.response)
            }
        }
    })
}

export async function get24Hrs() {

    return consumeBinanceApi('/ticker/24hr', getData)
}

export async function getPrice() {

    return consumeBinanceApi('/ticker/price', getData)
}

function getData(responseString) {

    // Convierto String a JSON.
    let obj = JSON.parse(responseString)

    // Valores que terminen por el symbol dado por parámetro.
    let objResult = searchEndsWithSymbol(obj, "USDT")

    // Simbolos ordenados por popularidad.
    objResult = popularSymbols(objResult, 0, 10)                        // (JSON), (0 mayor-menor, 1 menor-mayor), (Cantidad de symbolos a mostrar).

    const pairs = objResult.map(pair => pair.symbol.replace('USDT', ''))
    let euroPrice = obj.find(pair => pair.symbol.startsWith('EURUSDT')).lastPrice

    objResult.forEach(pair => console.log(`${pair.symbol} - € ${pair.lastPrice / euroPrice} $ ${pair.lastPrice}`))

    return objResult
}

// Visualiza los valores que empiezen por el symbol dado por parámetro.
function searchStartsWithSymbol(obj, symbol) {
    // Array de resultados.
    let result = []
    for (const iterator of obj) {
        // Que empiece por symbol.
        if (iterator.symbol.startsWith(symbol)) {
            result.push(iterator)
        }
    }

    return result
}

// Visualiza los valores que terminen por el symbol dado por parámetro.
function searchEndsWithSymbol(obj, symbol) {
    // Array de resultados.
    let result = []
    for (const iterator of obj) {
        // Que empiece por symbol.
        if (iterator.symbol.endsWith(symbol)) {
            result.push(iterator)
        }
    }

    return result
}

// Visualiza los valores que contengan el symbol dado por parámetro.
function searchIncludesSymbol(obj, symbol) {
    // Array de resultados.
    let result = []
    for (const iterator of obj) {
        // Que incluya symbol.
        if (iterator.symbol.includes(symbol)) {
            result.push(iterator)
        }
    }

    return result
}





// Ordena el Array dado por parámetro (SOLO NÚMEROS).
function popularSymbols(obj, action, quantity) {
    if (action == 1) {
        obj = obj.sort((a, b) => a.quoteVolume - b.quoteVolume)
    } else {
        obj = obj.sort((a, b) => b.quoteVolume - a.quoteVolume)
    }

    return obj.slice(0, quantity)
}

// Ordena el Array dado por parámetro (SOLO NÚMEROS).
function highSymbols(obj, action, quantity) {
    if (action == 1) {
        obj = obj.sort((a, b) => a.lastPrice - b.lastPrice)
    } else {
        obj = obj.sort((a, b) => b.lastPrice - a.lastPrice)
    }

    return obj.slice(0, quantity)
}