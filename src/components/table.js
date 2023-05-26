import { getHottestCrypto } from '../services/index.js'

class Table extends HTMLElement {

    #title

    #__table__ = null
    #alreadyRendered = false

    constructor(title = '') {
        super()

        this.#title = title
    }

    async connectedCallback() {

        if (this.#alreadyRendered) return

        this.render()
        this.#alreadyRendered = true

        this.querySelector('h2').innerText = this.getAttribute('title') || this.#title
        this.#__table__ = this.querySelector('.content')

        this.#insertData()

        //setInterval(() => this.#insertData(), 5000)
    }

    async #insertData() {

        let response

        try {
            response = await getHottestCrypto()

        } catch {
            this.#__table__.innerHTML = `
            <p>No hay conexión con la api</p>
            `
            return
        }

        this.#__table__.innerHTML = ''

        response.forEach(symbol => {
            const row = document.createElement('div')
            row.className = 'fila'
            const coin = document.createElement('div')
            coin.id = 'coin'

            const coinName = symbol.symbol.replace('USDT', '')

            const xhr = new XMLHttpRequest()
            xhr.open('GET', `assets/icons/color/${coinName.toLowerCase()}.svg`, false)
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

            const price = document.createElement('div')
            price.id = 'price'
            const str = ''
            str.substring()
            price.innerText = '$ ' + symbol.lastPrice.substring(0, 8)
            const change = document.createElement('div')
            change.id = 'change'
            change.className = symbol.priceChangePercent >= 0 ? 'positive' : 'negative'
            change.innerText = symbol.priceChangePercent.substring(0, symbol.priceChangePercent.indexOf('.') + 2) + ' %'

            row.appendChild(coin)
            row.appendChild(price)
            row.appendChild(change)

            this.#__table__.appendChild(row)
        })
    }

    filter(filter) {
        const rows = this.querySelectorAll('div.content div.fila')
        rows.forEach(row => {
            const symbol = row.querySelector('div#coin div#coin')

            if (!symbol.innerText.includes(filter.toUpperCase())) {
                row.style.display = 'none'
            } else {
                row.style.display = 'flex'
            }
        })
    }

    render() {

        this.innerHTML = `
            <h2></h2>
            <div class="content"></div>
        `
    }
}

window.customElements.define('data-table', Table)
export default Table