class MenuButton extends HTMLElement {

    #alreadyRendered = false

    constructor() {
        super()
    }

    static get observedAttributes() {
        return ['src']
    }

    async connectedCallback() {
        const source = this.getAttribute('src')
        const text = this.innerText

        const isSVG = source.endsWith('.svg')
        
        if (isSVG) {
            this.innerHTML = await this.#getSVGIcon(source)
            
            const svg = this.querySelector('svg path')
            svg.setAttribute('fill', 'currentColor')
            
        } else {

            this.innerHTML = `
            <img src="assets/${source}" alt="${text}">
            `
        }

        const buttonText = document.createElement('div')
        buttonText.className = 'button-text'
        buttonText.innerText = text

        this.appendChild(buttonText)
    }

    async #getSVGIcon(source) {

        return new Promise(resolve => {
            
            const conn = new XMLHttpRequest()
            conn.open('GET', `assets/${source}`)
            conn.send()
    
            conn.onreadystatechange = () => {
                if (conn.readyState === conn.DONE && conn.status === 200) {
                    resolve(conn.responseText)
                }
            }
        })
    }
}

window.customElements.define('menu-button', MenuButton)
export default MenuButton