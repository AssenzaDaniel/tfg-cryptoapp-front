export default class extends HTMLElement {

    componentName = 'field'
    #bindedElement = null
    #data = ''

    constructor() {
        super()
    }

    get data() {
        return this.#data
    }

    set bindElement(element) {
        this.#bindedElement = element
    }

    #setData() {
        this.#data = this.querySelector('input').value

        if (this.#bindedElement) this.#bindedElement.name = this.#data
    }

    connectedCallback() {
        this.addEventListener('keyup', this.#setData)
        this.render()
    }

    attributeChangedCallback(attribute, oldValue, newValue = '') {

        if (oldValue !== newValue) this[attribute] = newValue
    }

    static get observedAttributes() { 
        return ['data']; 
    }

    render() {
        this.innerHTML = `
        <link rel="stylesheet" href="./${this.componentName}.css">
        <label for="data">Data</label>
        <input type="text" id="data">
        `
    }
}

import self from './field.js'
customElements.define('input-field', self)