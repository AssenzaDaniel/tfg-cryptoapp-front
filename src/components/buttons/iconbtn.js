import { assets } from '/assets/assets.js'

/**
 * Componente IconButton, hace como botón con un icono
 */
class IconButton extends HTMLElement {

    #alreadyRendered

    constructor() {
        super()

        this.#alreadyRendered = false
    }

    /**
     * Método que se ejecuta al renderizar el componente en el DOM,
     * obtiene el src de un atributo y un texto si lo contiene, 
     * si el src del archivo es un svg entonces se lee el archivo del servidor
     * y lo injecta como HTML, si es una imagen normal lo incluye en un elemento img
     */
    async connectedCallback() {
        if (this.#alreadyRendered) return

        const source = this.getAttribute('src').toLowerCase()
        const asset = this.#getIcon(source)
        const text = this.innerText

        const isSVG = source.endsWith('.svg')

        const icon = isSVG 
            ? asset
            : `<img src="assets/${window.atob(source)}" alt="${text}">`
        
        this.#render(icon, text)

        this.#alreadyRendered = true
    }

    /**
     * @private
     * Realiza una petición al servidor para obtener el ícono
     * @param {URL} source path o ubicación de la imagen a solicitar
     * @returns SVG data as text
     */
    #getIcon(source) {
        return assets.find(asset => asset.file === source).data
    }

    #render(icon, text) {
        this.innerHTML = `
        ${icon}
        ${text !== '' ? `<div class="button-text">${text}</div>` : ''}
        `

        const svg = this.querySelector('svg path')

        if (!svg.getAttribute('stroke')) 
            svg.setAttribute('fill', 'currentColor')
        else
            svg.setAttribute('stroke', 'currentColor')
    }
}

window.customElements.define('icon-button', IconButton)
export default IconButton