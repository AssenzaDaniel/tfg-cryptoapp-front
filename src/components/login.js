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
        const google = this.querySelector("#google")

        google.onClick = () => {

            const petition_http = new XMLHttpRequest()
            petition_http.open("GET", "/login/google", false)
            petition_http.setRequestHeader("Access-Control-Allow-Origin", '*')
            petition_http.send()
            console.log(petition_http.response)
        }
    }

    attributeChangedCallback(attribute, oldValue, newValue) {

        if (this.#alreadyRendered && newValue !== oldValue) 
            this[attribute] = newValue
    }

    render() {

        this.innerHTML = `
        <input-button src="assets/google-color.svg" alt="Google" id="google"></input-button>
        <input-button src="assets/github-color.svg" alt="GitHub"></input-button>
        <input-button src="assets/facebook-color.svg" alt="Facebook"></input-button>
        `
    }
}

window.customElements.define('user-login', Login)
export default Login