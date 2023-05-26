class SearchBar extends HTMLElement {

    #isWritting = false
    
    #input = null
    #onInputChange = null

    constructor() {
        super()
    }

    connectedCallback() {        
        this.render()
        
        this.#onInputChange = new Event('change')
        
        this.#input = document.querySelector('input')
        this.#input.addEventListener('input', () => this.#handleInputChange())        
    }

    focus() {
        setTimeout(() => this.#input.focus(), 500)
    }

    #handleInputChange() {
        if (this.#isWritting) return

        this.#isWritting = true

        setTimeout(() => {
            this.dispatchEvent(this.#onInputChange)
            this.#isWritting = false
        }, 500)
    }

    get text() {
        return this.#input.value
    }

    render() {
        this.innerHTML = `
        <menu-button src="search.svg"></menu-button>
        <input type="text" placeholder="Buscar">
        `
    }
}

window.customElements.define('search-bar', SearchBar)
export default SearchBar