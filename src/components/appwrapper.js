/**
 * Componente AppWrapper, funciona como main viewport en la aplicación
 * su funcion es modificar su contenido según el componente que se
 * quiera mostrar en la aplicación
 */
class AppWrapper extends HTMLElement {

    constructor() {
        super()
    }

    /**
     * @param { HTMLElement } element Element to show in the app wrapper
     */
    set content(element) {
        this.innerHTML = ''
        this.appendChild(element)
    }
}

window.customElements.define('app-wrapper', AppWrapper)
export default AppWrapper