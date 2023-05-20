import IconButton from './buttons/iconbtn.js'
import Overlay from './overlay.js'
import Login from './login.js'

class ModalBox extends HTMLElement {

    #closeBtn = null

    constructor() {
        super()
    }

    set src(source) {
        this.#closeBtn.src = source
    }

    connectedCallback() {
        this.render()

        this.#closeBtn = this.querySelector('#modal-close-btn')

        this.#closeBtn.addEventListener('click', () => {
            this.className = ''
        })
    }

    render() {

        this.innerHTML = `
        <c-overlay active></c-overlay>
        <div class="modal--window floating">
            <icon-button src="assets/close-icon.svg" id="modal-close-btn"></icon-button>
            <div id="modal--content">
                <user-login></user-login>
            </div>
        </div>
        `
    }
}

window.customElements.define('modal-box', ModalBox)
export default ModalBox