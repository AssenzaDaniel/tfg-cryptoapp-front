/**
 * Componente barra de búsqueda
 */
class SearchBar extends HTMLElement {

    #isWritting = false
    #lastSearch = ''
    
    #input = null
    #onInputChange = null

    constructor() {
        super()
    }

    /**
     * Método que se ejecuta al renderizarse el componente en el DOM,
     * lanza un custom event al el contenido del campo de búsqueda cambia
     */
    connectedCallback() {        
        this.render()
        
        this.#onInputChange = new CustomEvent('inputChange')
        
        this.#input = document.querySelector('input')
        this.#input.addEventListener('input', () => this.#handleInputChange())        
    }

    /**
     * Método para darle el foco al campo de búsqueda
     */
    focus() {
        setTimeout(() => this.#input.focus(), 500)
    }

    /**
     * Método que maneja el cambio de contenido del campo de búsqueda, 
     * funciona como un debounce y así hace que se lance el custom event
     * cada 500ms y sólo si el contenido del campo ha cambiado
     */
    #handleInputChange() {
        if (this.#isWritting || this.text === this.#lastSearch) return

        this.#isWritting = true
        
        setTimeout(() => {
            this.dispatchEvent(this.#onInputChange)
            this.#lastSearch = this.text
            this.#isWritting = false
        }, 500)
    }

    /**
     * Contenido del campo de búsqueda
     */
    get text() {
        return this.#input.value
    }

    render() {
        this.innerHTML = `
        <icon-button src="search.svg"></icon-button>
        <input type="text" placeholder="Symbol">
        `
    }
}

window.customElements.define('search-bar', SearchBar)
export default SearchBar