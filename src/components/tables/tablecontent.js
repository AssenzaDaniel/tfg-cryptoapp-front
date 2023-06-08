import { subscribeSymbol, getSubscriptions } from '/services/index.js'

/**
 * Componente TableContent que representa al contenido de la tabla
 */
class TableContent extends HTMLElement {

    #icon
    #symbol
    #name
    #price
    #change
    #onClick
    #clickable
    #alreadyRendered

    #_price
    #_change
    #_changeClass
    #_favButton

    /**
     * @param {JSON} symbol Es el JSON con los datos del símbolo
     * @param {Boolean} clickable Indica si el contenido puede ser marcado como favorito
     */
    constructor(symbol, clickable) {
        super()

        this.#clickable = clickable
        this.#icon = window.atob(symbol.icon)
        this.#symbol = symbol.symbol
        this.#name = symbol.name || symbol.symbol
        this.#price = symbol.lastPrice
        this.#change = symbol.priceChangePercent
        this.#alreadyRendered = false
    }

    /**
     * Método que se ejecuta al renderizarse el componente en el DOM,
     * Se encarga de guardar los elementos del DOM que van a actulizarse,
     * y añade el comportamiento que al ser clickeado el icono de favorito,
     * realiza una petición a la api para subscribirse/desuscribirse del simbolo
     */
    connectedCallback() {
        if (this.#alreadyRendered) return

        this.render()

        this.#_price = this.querySelector('#price')
        this.#_change = this.querySelector('#change')
        this.#_changeClass = this.querySelector('#percentage')
        this.#_favButton = this.querySelector('icon-button')
        
        if (this.#clickable) {
            this.#onClick = new CustomEvent('fav:click')

            this.#checkIfAlreadySubscribed()
            this.#_favButton.addEventListener('click', () => this.#subscribe())
        }

        this.#alreadyRendered = true
    }

    /**
     * Método que verifica si el usuario esta suscrito al simbolo para marcarlo como activo
     */
    async #checkIfAlreadySubscribed() {
        const subscriptions = getSubscriptions('assenzadaniel@gmail.com')

        subscriptions.then((list) => {

            if (list.includes(this.#symbol))
                this.setAttribute('selected', '')
        })
    }

    /**
     * Método que se ejecuta al hacer click en el ícono de favorito, intenta 
     * hacer la subscripción a través de la api y si no hay fallo marca el componente
     * como selected, también lanza el custom event fav:click
     */
    async #subscribe() {
        const subscribe = subscribeSymbol('assenzadaniel@gmail.com', this.#symbol)

        subscribe.then(() => {
        
            this.getAttribute('selected') !== null
                ? this.removeAttribute('selected')
                : this.setAttribute('selected', '')
                
            this.dispatchEvent(this.#onClick)
        })
    }

    /**
     * Recibe un objeto tipo Symbol con la información con la que va a actualizar el componente
     * @param {JSON} symbol Objeto Symbol
     */
    update(symbol) {
        this.#_price.innerText = symbol.lastPrice
        this.#_change.innerText = symbol.priceChangePercent
        this.#_changeClass.className = symbol.priceChangePercent >= 0 ? 'positive' : 'negative'
    }

    /**
     * Devuelve si el componente se encuentra como seleccionado
     */
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
        ${this.#clickable ? '<icon-button src="search-fav.svg"></icon-button>' : ''}
        `
    }
}

window.customElements.define('table-content', TableContent)
export default TableContent