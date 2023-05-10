import IconButton from './buttons/iconbtn.js'
import SearchBar from './searchbar.js'

class AppBar extends HTMLElement {

    #src = ''
    #__img__ = null
    #__searchBar__ = null
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
        
        this.#__searchBar__ = new SearchBar()
        this.#__searchBar__.id = 'search-bar'
        this.appendChild(this.#__searchBar__)

        const searchBtn = this.querySelector('#search-btn')
        const profileBtn = this.querySelector('#login-btn')
        
        searchBtn.bind('click', this.#__searchBar__, this.#__searchBar__.animate)
        profileBtn.onEvent('click', () => {
            const modal = document.querySelector("modal-box")
            modal.className = "active"
        })
    }

    attributeChangedCallback(attribute, oldValue, newValue = '') {

        if (this.#alreadyRendered && newValue !== oldValue)
            this[attribute] = newValue
    }

    render() {

        this.innerHTML = `
        <style>
            .app-bar {
                position: fixed;
                display: flex;
                align-items: center;
                top: 10px;
                left: 2.5vw;
                width: 95vw;
                height: 70px;
                background-color: var(--primary-color);
                box-sizing: border-box;
                border-radius: 50px;
                padding: 10px 15px;
                box-shadow: 0px 1px 10px -2px var(--shadow-color);
                //box-shadow: 0px 1px 10px -2px lightsteelblue;
                z-index: 100;
            }
            .app-bar * {
                align-items: center;
                max-height: 100%;
            }
            #login-btn {
            }
            #login-btn img {
                width: 23px;
            }
            .app-bar > * {
                height: 100%;
            }
            .float--right {
                display: flex;
                gap: 10px;
                margin-left: auto;
            }
        </style>
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