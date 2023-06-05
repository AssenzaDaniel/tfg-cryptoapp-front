class MenuButton extends HTMLElement {

    #alreadyRendered

    constructor() {
        super()

        this.#alreadyRendered = false
    }

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

    async #getSVGIcon(source) {
        const response = await fetch(`assets/${source}`, { method: 'GET'})
    
        return response.text()
    }
}

window.customElements.define('menu-button', MenuButton)
export default MenuButton