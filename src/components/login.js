import Button from '/components/buttons/loginbtn.js'
class Login extends HTMLElement {

    #alreadyRendered = false
    #bindedElement = null
    #onEvent = null

    constructor() {
        super()
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

    connectedCallback() {

        this.render()
        this.#alreadyRendered = true
    }

    attributeChangedCallback(attribute, oldValue, newValue) {

        if (this.#alreadyRendered && newValue !== oldValue) 
            this[attribute] = newValue
    }

    render() {

        this.innerHTML = `
        <login-button src="assets/google.svg" alt="Google"></login-button>
        <login-button src="assets/github.svg" alt="GitHub"></login-button>
        <login-button src="assets/facebook.svg" alt="Facebook"></login-button>
        `
    }
}

window.customElements.define('user-login', Login)
export default Login