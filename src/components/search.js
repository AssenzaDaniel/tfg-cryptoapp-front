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
            this.#searchTable.filter(this.#searchBar.text)

            new Promise((resolve, reject) => {
                
                const search = this.#searchBar.text
                const xhr = new XMLHttpRequest()
    
                xhr.open('GET', `http://localhost:1717/api/search?symbol=${search}`)
                xhr.send()
                xhr.onload = () => resolve(JSON.parse(xhr.responseText))
            }).then(response => console.log(response))
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