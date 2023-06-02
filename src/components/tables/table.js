import TableContent from './tablecontent.js'
import { getUpdates } from '/services/index.js'

class Table extends HTMLElement {

    #title
    #table
    #tableStyle
    #favoritesTable
    #alreadyRendered
    #onCreate
    #symbols
    #_symbols

    constructor(title = '', onCreate, allowsFavorites = false, tableStyle) {
        super()

        this.#tableStyle = tableStyle
        this.#favoritesTable = allowsFavorites
        this.#alreadyRendered = false
        this.#onCreate = onCreate
        this.#title = title
        this.#symbols = []
        this.#_symbols = []

    }
    
    async connectedCallback() {
        if (this.#alreadyRendered) return
        
        this.render()
        this.#alreadyRendered = true

        this.#table = this.querySelector('.content')
        this.querySelector('h2').innerText = this.getAttribute('title') || this.#title

        this.#onCreate()
            .then(symbols => {

            symbols.forEach(symbol => {
                const content = new TableContent(symbol, this.#favoritesTable)

                this.#symbols.push(symbol.symbol)
                this.#_symbols.push(content)
                this.#table.appendChild(content)
            })

            this.#update()
            })
            .catch(error => this.#table.innerText = 'Sin conexión con el servidor')
    }
    
    async #update() {
        const updates = await getUpdates(this.#symbols)
            
        updates.addEventListener('message', event => {
            const symbols = JSON.parse(event.data)
            
            symbols.forEach(symbol => {
                const element = this.#_symbols.find(element => element.id === symbol.symbol)
                element.update(symbol)
            })
        })

        updates.addEventListener('error', event => {
            console.info('Lost connection with server, retry in 10s')
        })
    }

    add(event, action) {
        console.log(this.#_symbols)
        this.#_symbols.forEach(symbol => {
            symbol.element.addEventListener(event, action)
        })
    }

    render() {
        this.className = this.#tableStyle
        this.innerHTML = `
        <h2></h2>
        <div class="content"></div>
        `
    }
}

window.customElements.define('c-table', Table)
export default Table