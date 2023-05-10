import IconButton from './buttons/iconbtn.js'

class ModalBox extends HTMLElement {

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

        const closeBtn = this.querySelector('#modal-close-btn')
        closeBtn.onClick = function() {
            const modal = document.getElementById('modal')
            modal.className = ''
        }
    }

    attributeChangedCallback(attribute, oldValue, newValue = '') {

        if (this.#alreadyRendered && newValue !== oldValue)
            this[attribute] = newValue
    }

    render() {

        this.innerHTML = `
        <div id="bckg"></div>
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