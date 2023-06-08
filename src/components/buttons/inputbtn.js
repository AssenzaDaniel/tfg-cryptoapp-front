/**
 * Componente tipo botón utilizado para el login, se pudo
 * haber hecho más genérico para ser reutilizable
 */
class Button extends HTMLElement {

    #src = ''
    #socialName = ''
    #__img__ = null
    #alreadyRendered = false

    /**
     * @param {String} iconSrc ubicación o path del ícono para el botón
     */
    constructor(iconSrc = null) {
        super()
        this.#src = iconSrc
    }

    /**
     * Método que se ejecuta al rendirzarse el componente en el DOM,
     * inyecta los atributos que recibe este componente a sus elementos HTML
     */
    connectedCallback() {
        if (this.#alreadyRendered) return

        this.#src = this.getAttribute('src')
        this.#socialName = this.getAttribute('alt')
        this.#__img__ = this.querySelector('img')

        this.render()
        this.#alreadyRendered = true
    }

    render() {
        this.innerHTML = `
        <button type="button" class="mybtn">
            <img src="${ this.#src }" alt="${ this.#socialName }">
            <a>Signup using ${ this.#socialName }</a>
        </button>
        `
    }
}

window.customElements.define('input-button', Button)
export default Button