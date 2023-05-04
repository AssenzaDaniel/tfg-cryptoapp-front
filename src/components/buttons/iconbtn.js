class IconButton extends HTMLElement {

    #src = ''
    #__img__ = null
    #alreadyRendered = false
    #bindedElement = null
    #onEvent = null

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

    set onClick(action) {

        this.#onEvent = action
        this.addEventListener('click', this.#onEvent)
    }

    /**
     * @param { String } event Event to add listener
     * @param { HTMLElement } element Element to bind action
     * @param { Function } action Action to bind
     */
    bind(event, element, action) {
        this.#bindedElement = element
        this.#onEvent = action.bind(element)

        this.addEventListener(event, (event) => {
            this.#onEvent()
            event.stopPropagation()
        })
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