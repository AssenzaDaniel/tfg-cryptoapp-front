export default class extends HTMLElement {

    componentName = 'owner'
    #name

    constructor(name = '') {
        super()
        this.#name = name
        this.addEventListener('click', this.#modifyName)
    }

    get name() {
        return this.#name
    }

    set name(value) {

        if (value === this.#name) return

        this.#name = value
        this.render()
    }

    #modifyName(event) {

        const newName = window.prompt('Ingresa nuevo nombre')
        this.name = newName || ''
        event.stopPropagation()
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(attribute, oldValue, newValue = '') {

        if (oldValue !== newValue) this[attribute] = newValue
    }

    static get observedAttributes() { 
        return ['name']; 
    }

    render() {
        this.innerHTML = `
        <link rel="stylesheet" href="./${this.componentName}.css">
        <p>Bienvenido, ${this.#name}.<p>
        `
    }
}

import self from './owner.js'
customElements.define('user-greeting', self)