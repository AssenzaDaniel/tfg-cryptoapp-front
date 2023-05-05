class Button extends HTMLElement {

    #src = ''
    #href = ''
    #socialName = ''
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

        this.addEventListener(event, this.#onEvent)
    }

    static get observedAttributes() {
        return ['src'];
    }

    connectedCallback() {
        this.#src = this.getAttribute('src')
        this.#socialName = this.getAttribute('alt')
        this.#href = this.getAttribute('href')

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
            <a href="${ this.#href }">Signup using ${ this.#socialName }</a>
        </button>
        `
    }
}

window.customElements.define('login-button', Button)
export default Button