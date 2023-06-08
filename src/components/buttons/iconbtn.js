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

        const source = this.getAttribute('src')
        const text = this.innerText

        const isSVG = source.endsWith('.svg')
        
        if (isSVG) {
            this.innerHTML = await this.#getSVGIcon(source)
            
            const svg = this.querySelector('svg path')

            if (!svg.getAttribute('stroke')) 
                svg.setAttribute('fill', 'currentColor')
            else
                svg.setAttribute('stroke', 'currentColor')


        } else {

            this.innerHTML = `
            <img src="assets/${source}" alt="${text}">
            `
        }

        if (text) {
            const buttonText = document.createElement('div')
            buttonText.className = 'button-text'
            buttonText.innerText = text
    
            this.appendChild(buttonText)
        }

        this.#alreadyRendered = true
    }

    /**
     * @private
     * Realiza una petición al servidor para obtener el ícono
     * @param {URL} source path o ubicación de la imagen a solicitar
     * @returns SVG data as text
     */
    async #getSVGIcon(source) {
        const response = await fetch(`assets/${source}`, { method: 'GET'})
    
        return response.text()
    }
}

window.customElements.define('icon-button', IconButton)
export default IconButton