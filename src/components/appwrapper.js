class AppWrapper extends HTMLElement {

    constructor() {
        super()
    }

    /** Element to append to the app wrapper
     * @param { HTMLElement } element
     */
    set content(element) {
        this.innerHTML = ''
        this.appendChild(element)
    }
}

window.customElements.define('app-wrapper', AppWrapper)
export default AppWrapper