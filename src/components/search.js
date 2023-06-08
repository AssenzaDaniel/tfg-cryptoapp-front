import { search, getSymbols } from '../services/index.js'
import SearchBar from './bars/searchbar.js'
import Table from './tables/table.js'

/**
 * Componente HTML Search, representa a la pantalla de búsqueda
 */
class Search extends HTMLElement {

    #isActive = false

    #searchBar = null
    #searchTable = null

    constructor() {
        super()
    }

    /**
     * Método que se ejecuta al renderizarse el componente en el DOM,
     * define los elementos que usa el componente como la searchBar, la tabla
     * y añade un event listener al cambiar el contenido de la searchBar, pide
     * al api rest los resultados y le dice a la tabla que se actualice con el resultado
     */
    connectedCallback() {
        this.render()

        this.#searchBar = this.querySelector('search-bar')
        const content = this.querySelector('.content')

        this.#searchTable = new Table('Search', getSymbols, true, 'cards')
        content.appendChild(this.#searchTable)

        this.#searchBar.addEventListener('inputChange', () => {
            const symbol = this.#searchBar.text

            if (symbol.length === 0) return

            search('assenzadaniel@gmail.com', symbol).then(symbols => this.#searchTable.updateContent(symbols))
        })
    }

    /**
     * Método que muestra y oculta este componente, es manejado
     * por el componente app
     */
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

    /**
     * Método que renderiza los elementos del componente en el DOM
     */
    render() {
        this.innerHTML = `
        <div class="--overlay"></div>
        <search-bar></search-bar>
        <div class="content"></div>
        `
    }
}

window.customElements.define('c-search', Search)
export default Search