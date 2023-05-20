class IconButton extends HTMLElement {

    #src = ''
    #__img__ = null
    #alreadyRendered = false

    constructor(iconSrc = null) {
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
        <img src="${ this.#src }" alt="search">
        `
    }
}

window.customElements.define('icon-button', IconButton)
export default IconButton