import IconButton from './buttons/iconbtn.js'
import SearchBar from './searchbar.js'

class AppBar extends HTMLElement {

    #src = ''
    #__img__ = null
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
        return ['src'];
    }

    connectedCallback() {
        this.#src = this.getAttribute('src')
        
        this.render()

        this.#__img__ = this.querySelector('img')
        this.#alreadyRendered = true

        const searchBtn = this.querySelector('#search-btn')
        const searchBar = this.querySelector('#search-bar')

        searchBtn.bind('click', searchBar, searchBar.animate)

        const profileBtn = this.querySelector('#login-btn')
        profileBtn.onClick = function() {
            window.location.href = 'https://google.es'
        }
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
                background-color: white;
                box-sizing: border-box;
                border-radius: 50px;
                padding: 10px 15px;
                box-shadow: 0px 2px 10px gainsboro;
                //box-shadow: 0px 1px 10px -2px lightsteelblue;
                z-index: 100;
            }
            .app-bar * {
                align-items: center;
                max-height: 100%;
            }
            .app-bar > * {
                height: 100%;
            }
            .float--left {
                display: flex;
                gap: 10px;
                margin-left: auto;
            }
        </style>
        <div class="app-bar">
            <img src="${ this.#src }" alt="logo">
            <div class="float--left">                
                <icon-button src="assets/search.png" id="search-btn"></icon-button>
                <icon-button src="assets/google.png" id="login-btn"></icon-button>
            </div>
        </div>
        <search-bar id="search-bar"></search-bar>
        `
    }
}

window.customElements.define('app-bar', AppBar)
export default AppBar