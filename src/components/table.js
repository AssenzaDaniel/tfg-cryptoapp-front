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

            row.innerHTML = `
            <div class="coin">
                ${window.atob(symbol.icon)}
                <div class="name">${symbol.name}</div>
            </div>
            <div class="price">
                <div>
                    $ ${symbol.lastPrice}
                </div>
                <div class="${symbol.priceChangePercent >= 0 ? 'positive' : 'negative'}">
                    ${symbol.priceChangePercent} %
                </div>
            </div>
            `

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