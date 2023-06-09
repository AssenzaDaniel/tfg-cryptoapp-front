import IconButton from '/components/buttons/iconbtn.js'

/**
 * Componente que corresponde a la barra de la aplicación
 */
class AppBar extends HTMLElement {

    #logoSrc = ''
    #searchBtnOnClick = null
    #perfilBtnOnClick = null

    constructor() {
        super()
    }

    /**
     * Método que se ejecuta al renderizar el componente en el DOM,
     * crea los custom events para los botones búsqueda y perfíl, luego 
     * cuando el botón recibe el evento onClick, la app bar lanza el
     * custom event correspondiente para que la app lo pueda gestionar
     */
    connectedCallback() {
        this.render()
        
        this.#searchBtnOnClick = new CustomEvent('opensearch')
        this.#perfilBtnOnClick = new CustomEvent('openuser')
        
        const searchBtn = this.querySelector('#search-btn')
        const profileBtn = this.querySelector('#user-btn')
        
        searchBtn.addEventListener('click', () => {
            this.dispatchEvent(this.#searchBtnOnClick)
        })

        profileBtn.addEventListener('click', () => {
            this.dispatchEvent(this.#perfilBtnOnClick)
        })
    }

    /**
     * Actualiza el ícono de usuario con la imagen al realizar login
     * @param {URL} image URL de la imagen del usuario
     */
    updateUserImage(image) {
        const user = this.querySelector('#user-btn')
        user.className = 'user-image'

        user.innerHTML = `<img src="${image}"></img>`
    }

    render() {
        this.innerHTML = `
        <div class="app-bar">
            <img id="logo" alt="logo" src="assets/logo.png">
            <div class="float--right">                
                <icon-button src="search.svg" id="search-btn"></icon-button>
                <icon-button src="user.svg" id="user-btn"></icon-button>
            </div>
        </div>
        `
    }
}

window.customElements.define('app-bar', AppBar)
export default AppBar