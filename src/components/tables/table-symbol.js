class Symbol extends HTMLElement {

    #icon
    #symbol
    #name
    #price
    #change

    #_price
    #_change
    #_changeClass

    constructor(symbol) {
        super()

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
    }

    update(symbol) {
        this.#_price.innerText = symbol.lastPrice
        this.#_change.innerText = symbol.priceChangePercent
        this.#_changeClass.className = symbol.priceChangePercent >= 0 ? 'positive' : 'negative'
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
        `
    }
}

window.customElements.define('table-symbol', Symbol)
export default Symbol