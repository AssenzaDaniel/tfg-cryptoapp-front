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
        this.#searchTable.onClick = (event) => this.#onFavoriteClick(event)

        content.appendChild(this.#searchTable)

        this.#searchBar.addEventListener('inputChange', () => this.#updateSearchTable())
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
     * Método que se encarga de actualizar la tabla con el valor de la
     * barra de busqueda
     */
    #updateSearchTable() {
        const symbol = this.#searchBar.text

        if (symbol.length === 0) return

        search('assenzadaniel@gmail.com', symbol).then(symbols => this.#searchTable.updateContent(symbols))
    }

    /**
     * Al recibir el evento onClick de la tabla, se lanza el evento table:change
     * @param {Event} event Datos del evento que se ha lanzado
     */
    #onFavoriteClick(event) {
        const symbol = event.target
        const isFavorite = symbol.isActive
        
        const details = {
            detail: {
                symbol: symbol.id,
                favorite: isFavorite
            }
        }

        this.dispatchEvent(new CustomEvent('table:change', details))
    }

    unmarkSymbol(symbol) {
        this.#searchTable.unmarkSymbol(symbol)
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