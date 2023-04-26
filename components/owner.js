export default class extends HTMLElement {

    #componentName = 'owner'
    #nameSpan = null
    #name = ''

    constructor(name = '') {
        super()
        this.#name = name

        this.render()
        this.#nameSpan = this.querySelector('#name')
    }
    
    get name() {
        return this.#name
    }
    
    set name(value) {
        if (value === this.#name) return

        this.#name = value
        this.#nameSpan.innerText = value
    }

    #modifyName() {
        const newName = window.prompt('Ingresa nuevo nombre')
        this.name = newName || ''
    }

    // Window.onload
    connectedCallback() {
        this.addEventListener('click', this.#modifyName)
    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(attribute, oldValue, newValue = '') {
        if (oldValue !== newValue) this[attribute] = newValue
    }

    render() {
        this.innerHTML = `
        <link rel="stylesheet" href="./${this.#componentName}.css">
        <p>Bienvenido, <span id="name">${this.#name}</span>.<p>
        `
    }
}

import self from './owner.js'
customElements.define('user-greeting', self)