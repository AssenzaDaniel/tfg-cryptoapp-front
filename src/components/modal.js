import Login from './login.js'

/**
 * Componente modal, se encarga de crear un elemento modal para viusalizar
 * contenido adicional flotante en la aplicación
 */
class ModalBox extends HTMLElement {

    #alreadyRendered = false
    #closeBtn = null

    constructor() {
        super()
    }

    /**
     * Método que se ejecuta al renderizar el compontente en el DOM,
     * indica que al ser clickeado el closeBtn se cierre la modal
     */
    connectedCallback() {
        if (this.#alreadyRendered) return
        
        this.render()
        this.#alreadyRendered = true

        this.#closeBtn = this.querySelector('.--close-btn')
        this.#closeBtn.addEventListener('click', () => this.className = '')
    }

    render() {
        this.innerHTML = `
        <div class="--overlay" active></div>
        <div class="modal--window floating">
            <icon-button src="close-icon.svg" class="--close-btn"></icon-button>
            <div id="modal--content">
                <user-login></user-login>
            </div>
        </div>
        `
    }
}

window.customElements.define('modal-box', ModalBox)
export default ModalBox