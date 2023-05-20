class Table extends HTMLElement {

    #__table__ = null
    #__title__ = null
    #alreadyRendered = false

    constructor() {
        super()
    }

    async connectedCallback() {

        this.render()
        this.#alreadyRendered = true

        this.#__table__ = this.querySelector(".content")
        this.#__title__ = this.querySelector(".title")

        const res = await this.#fetchData()
        this.#insertData(res)

        setInterval(async () => {
            const response = await this.#fetchData()
            this.#insertData(response)

        }, 5000)

        //const searchBar = document.querySelector('search-bar')
    }

    attributeChangedCallback(attribute, oldValue, newValue) {

        if (this.#alreadyRendered && newValue !== oldValue) 
            this[attribute] = newValue
    }

    async #fetchData() {
        //return await get24Hrs()

        //searchSymbols('BTC', aux)
        //    .then(res => console.log(res))
        //    .catch(error => console.error(error))

        //console.log(res);

        const conn = new XMLHttpRequest()
        conn.open('GET', 'http://localhost:1717/api/24hrsChanges', false)
        //conn.open('POST', 'http://localhost:1717/api/24hrsChanges', false)
        //conn.setRequestHeader('Content-Type', 'application/json')
        //conn.send(JSON.stringify({ symbols: ['BTCUSDT', 'ETHUSDT'] }))
        conn.send()
        return JSON.parse(conn.responseText)
    }

    #insertData(response) {

        if (response.length === 0) return

        this.#__table__.innerHTML = ''
        this.#__title__.innerText = 'Hottest'

        response.forEach(symbol => {
            const row = document.createElement("div")
            row.className = "fila"
            const coin = document.createElement("div")
            coin.id = "coin"

            const coinName = symbol.symbol.replace("USDT", "")

            const xhr = new XMLHttpRequest()
            xhr.open("GET", `assets/icons/color/${coinName.toLowerCase()}.svg`, false)
            xhr.send()
            if (xhr.readyState == 4 && xhr.status == 200) {
                coin.innerHTML = `
                    <img src="${`assets/icons/color/${coinName.toLowerCase()}.svg`}">
                    <div id="coin">${coinName}</div>
                `
            } else {
                coin.innerHTML = `
                    <img src="${`assets/icons/generic-crypto.png`}">
                    <div id="coin">${coinName}</div>
                `
            }

            const price = document.createElement("div")
            price.id = "price"
            const str = ""
            str.substring()
            price.innerText = '$ ' + symbol.lastPrice.substring(0, 8)
            const change = document.createElement("div")
            change.id = "change"
            change.className = symbol.priceChangePercent >= 0 ? 'positive' : 'negative'
            change.innerText = symbol.priceChangePercent.substring(0, symbol.priceChangePercent.indexOf(".") + 2) + ' %'

            row.appendChild(coin)
            row.appendChild(price)
            row.appendChild(change)

            this.#__table__.appendChild(row)
        })
    }

    render() {

        this.innerHTML = `
            <h2 class="title">Hottest</h2>
            <div class="content"></div>
        `
    }
}

window.customElements.define('data-table', Table)
export default Table