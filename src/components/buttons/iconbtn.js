import { BindableHTMLElement } from "../bindable-element.js"

class IconButton extends BindableHTMLElement {

    #src = ''
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
        return ['src'];
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

    test() {
        this.style.backgroundColor = 'white'
    }

    render() {

        this.innerHTML = `
        <style>
            icon-button {
                position: relative;
                height: 50px;
                width: 50px;
                border-radius: 100px;
                margin: 0 auto;
            }

            icon-button:active {
                background-color: azure;
                box-shadow: 0 0 15px -3px lightblue;
            }

            .icon-btn {
                display: flex;
                height: inherit;
                justify-content: center;
            }

            .rounded {
                box-shadow: 0px 0px 15px -5px lightgray;
            }
            
            icon-button img {
                width: 30px;
                height: 30px;
            }

            .invert-color {
                filter: invert(0.5);
            }
        </style>
        <div class="icon-btn">
            <img src="${ this.#src }" alt="search">
        </div>
        `
    }
}

window.customElements.define('icon-button', IconButton)
export default IconButton