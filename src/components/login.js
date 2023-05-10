import { BindableHTMLElement } from './bindable-element.js'
import Button from '/components/buttons/loginbtn.js'

class Login extends BindableHTMLElement {

    #alreadyRendered = false

    constructor() {
        super()
    }

    connectedCallback() {

        this.render()
        this.#alreadyRendered = true
        const google = this.querySelector("#google")

        google

        google.onEvent('click' ,() => {

            window.open('/login/google', '_self')

            // const petition_http = new XMLHttpRequest()
            // petition_http.open("GET", "/login/google", false)
            // petition_http.setRequestHeader("Access-Control-Allow-Origin", ['*'])
            // petition_http.send()
            // console.log(petition_http.response)
        })
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