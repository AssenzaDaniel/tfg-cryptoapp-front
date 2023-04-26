
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

// Obtener la instancia del objeto XMLHttpRequest.

//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let peticion_http = new XMLHttpRequest()

// https://api.binance.com/api/v3/ticker/price
const API_URL = "https://api.binance.com/api/v3/ticker/24hr";

//Conexión con la API al cargar la página.
//onload = conexionAPI(API_URL);

// Realiza la conexión con la API.
export default function () {
    // Realizo petición HTTP.
    peticion_http.open('GET', API_URL);
    peticion_http.send();
    
    //Obtención de datos al cargar la petición.
    peticion_http.onload = () => {

        // Petición con status 200.
        if (peticion_http.status == 200) {
    
            // String de datos recibidos de la API.
            let responseString = peticion_http.responseText;
    
            // Convierto String a JSON.
            let obj = JSON.parse(responseString);
    
    
            // Visualizo los valores que comiencen por el symbol dado por parámetro.
            //objResult = searchStartsWithSymbol(obj, "USDT");
    
            // Visualizo los valores que contengan el symbol dado por parámetro.
            //objResult = searchIncludesSymbol(obj, "USDT");
    
            // Visualizo los valores que terminen por el symbol dado por parámetro.
            let objResult = searchEndsWithSymbol(obj, "USDT");
    
            // Simbolos ordenados por popularidad.
            objResult = popularSymbols(objResult, 0, 10);               // (JSON), (0 mayor-menor, 1 menor-mayor), (Cantidad de symbolos a mostrar).
    
            // Visualizo JSON por consola.
            console.log("\nVolumen de mercado Mayor-Menor: ")
            visualizarConsola(objResult);

            return objResult
/*     
    
    
            // Simbolos ordenados por popularidad.
            objResult = highSymbols(objResult, 0, 10);               // (JSON), (0 mayor-menor, 1 menor-mayor), (Cantidad de symbolos a mostrar).
    
            // Visualizo JSON por consola.
            console.log("\nPrecio Mayor-Menor: ")
            visualizarConsola(objResult); */
    
        } else {
            console.log(`Error: ${peticion_http.status}`);
            return null
        }
    }
}






// Visualiza los valores que empiezen por el symbol dado por parámetro.
function searchStartsWithSymbol(obj, symbol) {
    // Array de resultados.
    let result = [];
    for (const iterator of obj) {
        // Que empiece por symbol.
        if (iterator.symbol.startsWith(symbol)) {
            result.push(iterator);
        }
    }

    return result;
}

// Visualiza los valores que terminen por el symbol dado por parámetro.
function searchEndsWithSymbol(obj, symbol) {
    // Array de resultados.
    let result = [];
    for (const iterator of obj) {
        // Que empiece por symbol.
        if (iterator.symbol.endsWith(symbol)) {
            result.push(iterator);
        }
    }

    return result;
}

// Visualiza los valores que contengan el symbol dado por parámetro.
function searchIncludesSymbol(obj, symbol) {
    // Array de resultados.
    let result = [];
    for (const iterator of obj) {
        // Que incluya symbol.
        if (iterator.symbol.includes(symbol)) {
            result.push(iterator);
        }
    }

    return result;
}





// Ordena el Array dado por parámetro (SOLO NÚMEROS).
function popularSymbols(obj, action, quantity) {
    if (action == 1) {
        obj = obj.sort((a, b) => a.quoteVolume - b.quoteVolume);
    } else {
        obj = obj.sort((a, b) => b.quoteVolume - a.quoteVolume);
    }

    return obj.slice(0, quantity);
}

// Ordena el Array dado por parámetro (SOLO NÚMEROS).
function highSymbols(obj, action, quantity) {
    if (action == 1) {
        obj = obj.sort((a, b) => a.lastPrice - b.lastPrice);
    } else {
        obj = obj.sort((a, b) => b.lastPrice - a.lastPrice);
    }

    return obj.slice(0, quantity);
}





// Visualiza JSON por consola.
function visualizarConsola(obj) {
    if (obj == undefined) {
        console.log(`Error: ${obj}`);
    } else {
        console.log(obj);
    }
}