
// Realiza la conexión con la API.
async function searchData (symbol, objJSON, callback) {

    return new Promise((resolve, reject) => {

        if (callback(objJSON, symbol) != null) {

            resolve(callback(objJSON, symbol))
        } else {

            reject("Symbol no encontrado")
        }
    })
}

export async function searchSymbols(symbol, objJSON) {

    return searchData(symbol, objJSON, getData)
}

function getData(objJSON, symbol) {

    // Valores que empiecen por el symbol dado por parámetro.
    let objResult = searchStartsWithSymbol(objJSON, symbol)
    // Simbolos ordenados por popularidad.
    objResult = popularSymbols(objResult, 0, 10)                        // (JSON), (0 mayor-menor, 1 menor-mayor), (Cantidad de symbols a mostrar).

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
        // Que termine por symbol.
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