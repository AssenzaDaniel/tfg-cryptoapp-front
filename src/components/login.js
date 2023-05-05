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
        <login-button src="assets/google-color.svg" alt="Google" href="https://www.google.com"></login-button>
        <login-button src="assets/github-color.svg" alt="GitHub" href="https://www.github.com"></login-button>
        <login-button src="assets/facebook-color.svg" alt="Facebook" href="https://www.facebook.com"></login-button>
        `
    }
}

window.customElements.define('user-login', Login)
export default Login