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
        this.#searchTable = this.querySelector('data-table')

        this.#searchBar.addEventListener('change', () => { 
            const search = this.#searchBar.text
            const xhr = new XMLHttpRequest()

            xhr.open('GET', `http://localhost:1717/api/search?symbol=${search}`, false)
            xhr.send()

            console.log(JSON.parse(xhr.responseText))
            this.#searchTable.filter(this.#searchBar.text)
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
        <div class="content">
            <data-table></data-table>
        </div>
        `
    }
}

window.customElements.define('c-search', Search)
export default Search