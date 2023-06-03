import { search, getSymbols } from '../services/index.js'
import SearchBar from './bars/searchbar.js'
import Table from './tables/table.js'

class Search extends HTMLElement {

    #isActive = false

    #searchBar = null
    #searchTable = null

    constructor() {
        super()
    }

    connectedCallback() {
        this.render()

        this.#searchBar = this.querySelector('search-bar')
        const content = this.querySelector('.content')

        this.#searchTable = new Table('Search', getSymbols, true, 'cards')
        content.appendChild(this.#searchTable)

        this.#searchBar.addEventListener('inputChange', () => {
            const symbol = this.#searchBar.text
            
            search('assenzadaniel@gmail.com', symbol).then(symbols => this.#searchTable.updateContent(symbols))
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

    render() {
        this.innerHTML = `
        <c-overlay></c-overlay>
        <search-bar></search-bar>
        <div class="content"></div>
        `
    }
}

window.customElements.define('c-search', Search)
export default Search