import TableContent from './tablecontent.js'
import { getUpdates } from '/services/index.js'

class Table extends HTMLElement {

    #title
    #table
    #tableStyle
    #favoritesTable
    #alreadyRendered
    #updatesEvent
    #onCreate
    #onClick
    #symbols
    #_symbols

    constructor(title = '', onCreate, allowsFavorites = false, tableStyle) {
        super()

        this.#tableStyle = tableStyle
        this.#favoritesTable = allowsFavorites
        this.#alreadyRendered = false
        this.#onCreate = onCreate
        this.#title = title
    }
    
    async connectedCallback() {
        if (this.#alreadyRendered) return
        
        this.render()
        this.#alreadyRendered = true

        this.#table = this.querySelector('.content')
        this.querySelector('h2').innerText = this.getAttribute('title') || this.#title

        this.#onCreate()
            .then(symbols => this.updateContent(symbols))
            .catch(error => this.#table.innerText = 'Sin conexión con el servidor')
    }
    
    async #update() {
        if (this.#updatesEvent) this.#updatesEvent.close()

        this.#updatesEvent = await getUpdates(this.#symbols)
            
        this.#updatesEvent.addEventListener('message', event => {
            const symbols = JSON.parse(event.data)
                        
            symbols.forEach(symbol => {
                const element = this.#_symbols.find(element => element.id === symbol.symbol)
                if (element) element.update(symbol)
            })
        })

        this.#updatesEvent.addEventListener('error', event => {
            console.info(`Lost connection with server, retry in ${event.retry}`)
        })
    }

    updateContent(symbols) {
        this.#symbols = []
        this.#_symbols = []
        this.#table.innerHTML = ''

        symbols.forEach(symbol => {
            const content = new TableContent(symbol, this.#favoritesTable)

            this.#symbols.push(symbol.symbol)
            this.#_symbols.push(content)
            this.#table.appendChild(content)

            if (!this.#favoritesTable || !this.#onClick) return

            content.addEventListener('fav:click', this.#onClick)
        })

        this.#update()
    }

    set onClick(event) {
        this.#onClick = event
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