import { subscribeSymbol, search, getSymbols } from '../services/index.js'
import SearchBar from './bars/searchbar.js'

class Search extends HTMLElement {

    #alreadyRendered = false
    #isActive = false

    #searchBar = null
    #searchTable = null

    constructor() {
        super()
    }

    connectedCallback() {
        this.render()

        this.#searchBar = this.querySelector('search-bar')
        this.#searchTable = this.querySelector('div.search-table')

        getSymbols().then(symbols => this.#updateTable(symbols))

        this.#searchBar.addEventListener('inputChange', () => { 
            const symbol = this.#searchBar.text
            this.#searchTable.innerHTML = ''

            search('assenzadaniel@gmail.com', symbol).then(symbols => this.#updateTable(symbols))
        })
    }

    show() {
        if (this.#isActive) {
            this.removeAttribute('active')
            document.body.style.overflow = 'scroll'
        } else {
            document.body.style.overflow = 'hidden'
            this.querySelector('search-bar').focus()
            this.setAttribute('active', '')
        }

        this.#isActive = !this.#isActive
    }

    #updateTable(symbols) {
        symbols.forEach(symbol => {                    
            const div = document.createElement('div')
            div.className = 'symbol'
            div.id = symbol.symbol

            const changeType = symbol.priceChangePercent >= 0 
                ? 'positive'
                : 'negative'
    
            div.innerHTML = `
            <div class="symbol-data">
                ${ window.atob(symbol.icon) }
                <span class="symbol">${ symbol.symbol }</span>
            </div>
            <div class="price">
                <div>${ symbol.lastPrice }</div>
                <div class="${ changeType }">${ symbol.priceChangePercent }%</div>
            </div>
            <menu-button src="search-fav.svg"></menu-button>
            `

            div.addEventListener('click', async () => {

                const symbol = div.querySelector('span.symbol').textContent
                const subscribe = subscribeSymbol('assenzadaniel@gmail.com', symbol)

                subscribe.then(() => {

                    div.getAttribute('selected') !== null
                        ? div.removeAttribute('selected')
                        : div.setAttribute('selected', '')
                })
            })

            if (symbol.favorite) {
                div.setAttribute('selected', '')
            }

            this.#searchTable.appendChild(div)
        })
    }

    render() {
        this.innerHTML = `
        <c-overlay></c-overlay>
        <search-bar></search-bar>
        <div class="content">
            <h2>Search</h2>
            <div class="search-table">
            </div>
        </div>
        `
    }
}

window.customElements.define('c-search', Search)
export default Search