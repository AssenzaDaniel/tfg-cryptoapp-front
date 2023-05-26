import IconButton from '/components/buttons/iconbtn.js'

class AppBar extends HTMLElement {

    #logoSrc = ''
    #searchBtnOnClick = null
    #perfilBtnOnClick = null

    constructor() {
        super()
    }

    set src(src) {
        this.querySelector('#logo').srcset = src
    }

    connectedCallback() {
        this.render()
        
        this.#searchBtnOnClick = new CustomEvent('opensearch')
        this.#perfilBtnOnClick = new CustomEvent('openuser')
        
        const searchBtn = this.querySelector('#search-btn')
        const profileBtn = this.querySelector('#login-btn')
        
        searchBtn.addEventListener('click', () => {
            this.dispatchEvent(this.#searchBtnOnClick)
        })

        profileBtn.addEventListener('click', () => {
            this.dispatchEvent(this.#perfilBtnOnClick)
        })
    }

    render() {
        this.innerHTML = `
        <div class="app-bar">
            <img id="logo" alt="logo">
            <div class="float--right">                
                <menu-button src="search.svg" id="search-btn"></menu-button>
                <icon-button src="assets/user.svg" id="login-btn" class="invert-color rounded"></icon-button>
            </div>
        </div>
        `
    }
}

window.customElements.define('app-bar', AppBar)
export default AppBar