import Symbol from './table-symbol.js'

class Table extends HTMLElement {

    #title = ''
    #table = null

    #alreadyRendered = false
    #onUpdate = null
    #symbols = []

    constructor(title, onUpdate) {
        super()

        this.#onUpdate = onUpdate
        if (title) this.#title = title
    }

    async connectedCallback() {
        if (this.#alreadyRendered) return

        this.render()
        this.#alreadyRendered = true

        this.#table = this.querySelector('.content')
        this.querySelector('h2').innerText = this.getAttribute('title') || this.#title

        this.#onUpdate().then(symbols => {

            symbols.forEach(symbol => {
                const content = new Symbol(symbol)

                this.#symbols.push({ symbol: symbol.symbol, element: content })
                this.#table.appendChild(content)
            })
        })

        setInterval(() => this.update(), 3000)
    }

    async update() {
        try {
            const symbols = await this.#onUpdate()

            symbols.forEach(symbol => {

                const element = this.#symbols.find(element => element.symbol === symbol.symbol).element
                element.update(symbol)
            })

        } catch(error) { console.log(error) }
    }

    render() {
        this.innerHTML = `
        <h2></h2>
        <div class="content"></div>
        `
    }
}

window.customElements.define('list-table', Table)
export default Table