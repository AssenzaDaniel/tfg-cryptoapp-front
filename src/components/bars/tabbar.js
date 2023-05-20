import MenuButton from '../buttons/menubtn.js'

class TabBar extends HTMLElement {

    #menuButtons = null

    constructor() {
        super()
    }

    connectedCallback() {
        this.render()

        this.#menuButtons = this.querySelectorAll('menu-button')
        this.#menuButtons.forEach(button => {
            button.addEventListener('click', () => this.#changeSelection(button))
        })
    }

    #changeSelection(selectedButton) {
        selectedButton.setAttribute('selected', '')

        this.#menuButtons.forEach(button => {
            if (button !== selectedButton) button.removeAttribute('selected')
        })
    }

    render() {

        this.innerHTML = `
        <div class="--overlay"></div>
        <div class="bar">
            <menu-button src="home.svg" id="home" selected>Home</menu-button>
            <menu-button src="wallet.svg" id="wallet">Wallet</menu-button>
            <menu-button src="fav.svg" id="favs">Favs</menu-button>
        </div>
        `
    }
}

window.customElements.define('tab-bar', TabBar)
export default TabBar