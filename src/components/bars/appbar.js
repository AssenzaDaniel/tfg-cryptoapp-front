import IconButton from '/components/buttons/iconbtn.js'
import SearchBar from '/components/searchbar.js'

class AppBar extends HTMLElement {

    #src = ''
    #__img__ = null
    #searchBar = null
    #alreadyRendered = false

    constructor() {
        super()
    }

    get src() {
        return this.#src
    }

    set src(value) {
        this.#src = value
        this.#__img__.src = value
    }

    static get observedAttributes() {
        return ['src']
    }

    connectedCallback() {
        this.#src = this.getAttribute('src')

        this.render()

        this.#__img__ = this.querySelector('img')
        this.#alreadyRendered = true
        
        this.#searchBar = new SearchBar()
        this.appendChild(this.#searchBar)

        this.#searchBar.addEventListener('change', () => console.log(this.#searchBar.text))

        const searchBtn = this.querySelector('#search-btn')
        const profileBtn = this.querySelector('#login-btn')
        
        searchBtn.addEventListener('click', (event) => {
            this.#searchBar.animate()
            event.stopPropagation()
        })

        profileBtn.addEventListener('click', () => {
            const modal = document.querySelector('modal-box')
            modal.className = 'active'
        })
    }

    attributeChangedCallback(attribute, oldValue, newValue = '') {

        if (this.#alreadyRendered && newValue !== oldValue)
            this[attribute] = newValue
    }

    render() {

        this.innerHTML = `
        <div class="app-bar">
            <img src="${ this.#src }" alt="logo">
            <div class="float--right">                
                <icon-button src="assets/search.png" id="search-btn" class="invert-color"></icon-button>
                <icon-button src="assets/user.svg" id="login-btn" class="invert-color rounded"></icon-button>
            </div>
        </div>
        `
    }
}

window.customElements.define('app-bar', AppBar)
export default AppBar