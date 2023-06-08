import IconButton from '../buttons/iconbtn.js'

/**
 * Componente TabBar o barra de navegación
 */
class TabBar extends HTMLElement {

    #tabs
    #onChangedSelection

    constructor() {
        super()
    }

    /**
     * Devuelve la opción activa
     */
    get selectedTab() {
        return this.querySelector('[selected]').getAttribute('option')
    }

    /**
     * @private
     * Devuelve el elemento seleccionado
     */
    get #selectedTab() {
        return this.querySelector('[selected]')
    }

    /**
     * Método que se ejecuta al renderizar el componente en el DOM,
     * lanza un evento al cambiar la selección de la barra
     */
    connectedCallback() {
        this.render()

        this.#onChangedSelection = new Event('change')

        this.#tabs = this.querySelectorAll('icon-button')
        this.#tabs.forEach(button => {
            button.addEventListener('click', () => this.#changeSelection(button))
        })
    }

    /**
     * Método que modifica la selección de la barra sólo si ha cambiado,
     * lanza un evento onChange para avisar a su padre y pueda gestionarlo
     * @param {IconButton} selectedButton opción seleccionada de la barra
     */
    #changeSelection(selectedButton) {
        if (selectedButton === this.#selectedTab) return

        this.#selectedTab.removeAttribute('selected')
        selectedButton.setAttribute('selected', '')
        this.dispatchEvent(this.#onChangedSelection)
    }

    render() {
        this.innerHTML = `
        <div class="tab-bar--overlay"></div>
        <div class="bar">
            <icon-button src="home.svg" option="home" selected>Home</icon-button>
            <icon-button src="wallet.svg" option="wallet">Wallet</icon-button>
            <icon-button src="fav.svg" option="favs">Favs</icon-button>
        </div>
        `
    }
}

window.customElements.define('tab-bar', TabBar)
export default TabBar