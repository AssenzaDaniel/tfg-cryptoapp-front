import { BindableHTMLElement } from "../bindable-element.js"

class LoginButton extends BindableHTMLElement {

    #src = ''
    #socialName = ''
    #__img__ = null
    #alreadyRendered = false

    constructor(iconSrc) {
        super()

        this.#src = iconSrc
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
        this.#socialName = this.getAttribute('alt')

        this.render()
        this.#__img__ = this.querySelector('img')
        this.#alreadyRendered = true
    }

    attributeChangedCallback(attribute, oldValue, newValue) {

        if (this.#alreadyRendered && newValue !== oldValue) 
            this[attribute] = newValue
    }

    render() {

        this.innerHTML = `
        <button type="button" class="mybtn">
            <img src="${ this.#src }" alt="${ this.#socialName }">
            <a href="#">Signup using ${ this.#socialName }</a>
        </button>
        `
    }
}

window.customElements.define('login-button', LoginButton)
export default LoginButton