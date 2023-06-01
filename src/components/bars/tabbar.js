import MenuButton from '../buttons/menubtn.js'

class TabBar extends HTMLElement {

    #menuButtons
    #onChangedSelection

    constructor() {
        super()
    }

    get selectedTab() {
        return this.querySelector('[selected]')
    }

    get selectedTabId() {
        return this.querySelector('[selected]').getAttribute('option')
    }

    connectedCallback() {
        this.render()

        this.#onChangedSelection = new Event('change')

        this.#menuButtons = this.querySelectorAll('menu-button')
        this.#menuButtons.forEach(button => {
            button.addEventListener('click', () => this.#changeSelection(button))
        })
    }

    #changeSelection(selectedButton) {
        if (selectedButton === this.selectedTab) return

        this.selectedTab.removeAttribute('selected')
        selectedButton.setAttribute('selected', '')
        this.dispatchEvent(this.#onChangedSelection)
    }

    render() {

        this.innerHTML = `
        <div class="--overlay"></div>
        <div class="bar">
            <menu-button src="home.svg" option="home" selected>Home</menu-button>
            <menu-button src="wallet.svg" option="wallet">Wallet</menu-button>
            <menu-button src="fav.svg" option="favs">Favs</menu-button>
        </div>
        `
    }
}

window.customElements.define('tab-bar', TabBar)
export default TabBar