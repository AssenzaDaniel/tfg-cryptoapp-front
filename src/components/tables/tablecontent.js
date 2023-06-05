import { subscribeSymbol, getSubscriptions } from '/services/index.js'

class TableContent extends HTMLElement {

    #icon
    #symbol
    #name
    #price
    #change
    #onClick
    #clickable

    #_price
    #_change
    #_changeClass
    #_favButton

    constructor(symbol, clickable) {
        super()

        this.#clickable = clickable
        this.#icon = window.atob(symbol.icon)
        this.#symbol = symbol.symbol
        this.#name = symbol.name || symbol.symbol
        this.#price = symbol.lastPrice
        this.#change = symbol.priceChangePercent
    }

    connectedCallback() {
        this.render()

        this.#_price = this.querySelector('#price')
        this.#_change = this.querySelector('#change')
        this.#_changeClass = this.querySelector('#percentage')
        this.#_favButton = this.querySelector('menu-button')
        
        if (this.#clickable) {
            this.#onClick = new CustomEvent('fav:click')

            this.#checkIfAlreadySubscribed()
            this.#_favButton.addEventListener('click', () => this.#subscribe())
        }
    }

    async #checkIfAlreadySubscribed() {
        const subscriptions = getSubscriptions('assenzadaniel@gmail.com')

        subscriptions.then((list) => {

            if (list.includes(this.#symbol))
                this.setAttribute('selected', '')
        })
    }

    async #subscribe() {
        const subscribe = subscribeSymbol('assenzadaniel@gmail.com', this.#symbol)

        subscribe.then(() => {
        
            this.getAttribute('selected') !== null
                ? this.removeAttribute('selected')
                : this.setAttribute('selected', '')
                
            this.dispatchEvent(this.#onClick)
        })
    }

    update(symbol) {
        this.#_price.innerText = symbol.lastPrice
        this.#_change.innerText = symbol.priceChangePercent
        this.#_changeClass.className = symbol.priceChangePercent >= 0 ? 'positive' : 'negative'
    }

    get isActive() {
        return this.getAttribute('selected') !== null
    }

    render() {
        this.id = this.#symbol
        this.innerHTML = `
        <div class="coin">
            ${this.#icon}
            <div class="name">${this.#name}</div>
        </div>
        <div class="price">
            <div class="lastPrice">
                <span id="price">${this.#price}</span>
            </div>
            <div id="percentage" class="${this.#change >= 0 ? 'positive' : 'negative'}">
                <span id="change">${this.#change}</span> %
            </div>
        </div>
        ${this.#clickable ? '<menu-button src="search-fav.svg"></menu-button>' : ''}
        `
    }
}

window.customElements.define('table-content', TableContent)
export default TableContent