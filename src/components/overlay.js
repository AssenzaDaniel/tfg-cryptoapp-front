class Overlay extends HTMLElement {

    #alreadyRendered = false
    isActive = false

    constructor() {
        super()
    }

    connectedCallback() {
    
        if (this.getAttribute('active')) this.show()
    }

    hide() {
        this.removeAttribute('active')
    }

    show() {
        this.setAttribute('active', '')
    }

    set color(color) {
        this.style.backgroundColor = color
    }
}

window.customElements.define('c-overlay', Overlay)
export default Overlay