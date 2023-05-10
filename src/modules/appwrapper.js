const div = document.createElement('div')
div.id = 'app-wrapper'

document.body.appendChild(div)

export default {

    wrapper: div,

    /**
     * 
     * @param { String } color color a cambiar el background del wrapper
     */
    changeColor(color) {
        this.wrapper.style.backgroundColor = color
    },

    /**
     * @param { HTMLElement } element
     */
    set content(element) {
        this.wrapper.innerHTML = ''
        this.wrapper.appendChild(element)
    }
}